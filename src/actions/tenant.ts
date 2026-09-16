"use server";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { revalidateTag, revalidatePath } from "next/cache";

export async function connectCustomDomainAction(slug: string, customDomain: string) {
  try {
    const cleanDomain = customDomain.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase();
    
    const zoneId = process.env.CLOUDFLARE_ZONE_ID;
    const globalApiKey = process.env.CLOUDFLARE_GLOBAL_API_KEY;
    const email = process.env.CLOUDFLARE_EMAIL; 
    const fallbackDomain = process.env.NEXT_PUBLIC_FALLBACK_DOMAIN || "cname.nexpetcare.online";

    if (!zoneId || !globalApiKey || !email) {
      return { success: false, error: "Missing Cloudflare GLOBAL API KEY or Email in .env.local" };
    }

    const headers: any = { 
      "Content-Type": "application/json",
      "X-Auth-Email": email.trim(),
      "X-Auth-Key": globalApiKey.trim()
    };

    // 🔥 1. SMART CHECK: Look to see if the domain is already in Cloudflare
    const checkResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId.trim()}/custom_hostnames?hostname=${cleanDomain}`, {
      method: "GET",
      headers,
    });
    
    const checkData = await checkResponse.json();
    let domainData = checkData.result?.[0]; // Will be undefined if it doesn't exist

    // 🔥 2. CREATE IF MISSING: If it doesn't exist, create it normally
    if (!domainData) {
      const createResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId.trim()}/custom_hostnames`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          hostname: cleanDomain,
          ssl: { method: "txt", type: "dv" }
        }),
      });
      
      const createData = await createResponse.json();

      if (!createResponse.ok) {
        throw new Error(createData.errors?.[0]?.message || "Cloudflare API Failed");
      }
      domainData = createData.result;
    }

    // 3. EXTRACT RECORDS: Grab the ownership and SSL TXT records
  // ... inside connectCustomDomainAction ...
    
    // 3. EXTRACT RECORDS: Grab the ownership and SSL TXT records
    const ownershipTxt = domainData.ownership_verification;
    const sslTxt = domainData.ssl?.validation_records?.[0];

    const dnsRecords = [{ type: "CNAME", name: "@", value: fallbackDomain }];
    if (ownershipTxt) dnsRecords.push({ type: "TXT", name: ownershipTxt.name, value: ownershipTxt.value });
    if (sslTxt) dnsRecords.push({ type: "TXT", name: sslTxt.txt_name, value: sslTxt.txt_value });

    // 🔥 4. UPDATE FIREBASE: Now saving the `dnsRecords` array to the database!
    const websiteRef = doc(db, "websites", slug);
    await updateDoc(websiteRef, {
      customDomain: cleanDomain,
      cloudflareId: domainData.id,
      domainStatus: domainData.status === "active" ? "active" : "pending",
      dnsRecords: dnsRecords, // <-- Added this line!
      lastUpdated: new Date().toISOString()
    });

    // Return the records to the frontend so the UI table renders
    return { success: true, dnsRecords };

    // Return the records to the frontend so the UI table renders
    return { success: true, dnsRecords };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function checkDomainStatusAction(slug: string, customDomain: string) {
  try {
    const zoneId = process.env.CLOUDFLARE_ZONE_ID;
    const token = process.env.CLOUDFLARE_API_TOKEN;
    const email = process.env.CLOUDFLARE_EMAIL;

    if (!zoneId || !token || !email) return { success: false, error: "Missing Credentials" };

    // 🔥 HARDCODED TO MATCH THE WORKING TEST SCRIPT
    const headers: any = { 
      "Content-Type": "application/json",
      "X-Auth-Email": email.trim(),
      "X-Auth-Key": token.trim()
    };

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId.trim()}/custom_hostnames?hostname=${customDomain}`, {
      method: "GET",
      headers,
    });

    const data = await response.json();
    const domainData = data.result?.[0];

    if (!domainData) throw new Error("Domain not found");

    if (domainData.status === "active") {
      const websiteRef = doc(db, "websites", slug);
      await updateDoc(websiteRef, { domainStatus: "active" });
    }

    return { success: true, status: domainData.status };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}



export async function deployWebsiteAction(slug: string) {
  try {
    const websiteRef = doc(db, "websites", slug);
    await updateDoc(websiteRef, {
      isDeployed: true,
      lastDeployed: new Date().toISOString()
    });

    // @ts-ignore - Bypasses Next.js 15 TS bug requiring 2 arguments
    revalidateTag(`website-${slug}`);
    // @ts-ignore
    revalidateTag("website");
    
    // 🔥 Bulletproof fallback: natively clear the URL route
    revalidatePath(`/${slug}`);

    return { success: true };
  } catch (error: any) {
    console.error("Deploy Error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function saveWebsiteSettingsAction(slug: string, settings: any) {
  try {
    const websiteRef = doc(db, "websites", slug);
    await updateDoc(websiteRef, {
      settings,
      lastUpdated: new Date().toISOString()
    });

    // @ts-ignore - Bypasses Next.js 15 TS bug requiring 2 arguments
    revalidateTag(`website-${slug}`);
    // @ts-ignore
    revalidateTag("website");

    // 🔥 Bulletproof fallback: natively clear the URL route
    revalidatePath(`/${slug}`);

    return { success: true };
  } catch (error: any) {
    console.error("Save Settings Error:", error);
    return { success: false, error: error.message };
  }
}

export async function saveWebsiteContentAction(slug: string, websiteOneData: any) {
  try {
    const websiteRef = doc(db, "websites", slug);
    await updateDoc(websiteRef, {
      websiteOneData,
      lastUpdated: new Date().toISOString()
    });

    // 🔥 FIX: Add the "max" argument required by Next.js 16
    revalidateTag(`website-${slug}`, "max");
    revalidateTag("website", "max");

    revalidatePath(`/${slug}`, 'page');
    revalidatePath(`/live/domain/[domain]`, 'page');

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function publishWebsiteUpdatesAction(slug: string) {
  try {
    // 1. Fetch the document to check for a custom domain
    const websiteRef = doc(db, "websites", slug);
    const websiteSnap = await getDoc(websiteRef);
    const websiteData = websiteSnap.data();

    // 2. Clear the standard slug tags
    // @ts-ignore
    revalidateTag(`website-${slug}`);
    // @ts-ignore
    revalidateTag("website");
    
    // 🔥 3. Explicitly clear the custom domain cache if it exists
    if (websiteData?.customDomain) {
      // @ts-ignore
      revalidateTag(`website-${websiteData.customDomain}`);
      revalidatePath(`/${websiteData.customDomain}`, 'page');
    }
    
    // 4. Force clear the Next.js static HTML for the normal routes
    revalidatePath(`/${slug}`, 'page');
    revalidatePath(`/${slug}`, 'layout');
    
    // 5. Force clear the Dashboard/Editor
    revalidatePath(`/dashboard/${slug}`);
    revalidatePath(`/dashboard/${slug}/edit`);
    revalidatePath(`/dashboard/${slug}/settings`);

    return { success: true };
  } catch (error: any) {
    console.error("Publish Error:", error);
    return { success: false, error: error.message };
  }
}