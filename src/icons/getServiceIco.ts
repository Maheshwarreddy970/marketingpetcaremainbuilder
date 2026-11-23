import type { ComponentType } from 'react';
import type { ServiceIconProps } from './IconBase';
import FullBodyGroomingIcon from './FullBodyGroomingIcon';
import BathBlowDryIcon from './BathBlowDryIcon';
import HaircutStylingIcon from './HaircutStylingIcon';
import NailTrimmingIcon from './NailTrimmingIcon';
import EarCleaningIcon from './EarCleaningIcon';
import TeethBrushingIcon from './TeethBrushingIcon';
import FleaTickIcon from './FleaTickIcon';
import SkinCoatCareIcon from './SkinCoatCareIcon';
import PuppyVisitIcon from './PuppyVisitIcon';
import InHomeVisitIcon from './InHomeVisitIcon';
import MaintenanceCleanIcon from './MaintenanceCleanIcon';

export type ServiceIcon = ComponentType<ServiceIconProps>;

const slugify = (s: string) =>
    s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/**
 * Pick the icon from the service heading.
 * 1) exact heading match  2) keyword fallback for renamed headings  3) default
 */
export function getServiceIcon(service: { title?: string; iconKey?: string }): ServiceIcon {
    const slug = slugify(service.iconKey || service.title || '');

    switch (slug) {
        case 'full-body-grooming':       return FullBodyGroomingIcon;
        case 'bath-and-blow-dry':        return BathBlowDryIcon;
        case 'haircut-and-styling':      return HaircutStylingIcon;
        case 'nail-trimming':            return NailTrimmingIcon;
        case 'ear-cleaning':             return EarCleaningIcon;
        case 'teeth-brushing':           return TeethBrushingIcon;
        case 'flea-and-tick-treatment':  return FleaTickIcon;
        case 'skin-and-coat-care':       return SkinCoatCareIcon;
        case 'puppy-visit':              return PuppyVisitIcon;
        case 'in-home-visits':           return InHomeVisitIcon;
        case 'maintenance-clean':        return MaintenanceCleanIcon;
    }

    // Fallback: keyword match (order matters: most specific first)
    switch (true) {
        case /flea|tick|pest/.test(slug):          return FleaTickIcon;
        case /ear/.test(slug):                     return EarCleaningIcon;
        case /teeth|tooth|dental/.test(slug):      return TeethBrushingIcon;
        case /nail|claw/.test(slug):               return NailTrimmingIcon;
        case /puppy|kitten/.test(slug):            return PuppyVisitIcon;
        case /home|mobile|doorstep/.test(slug):    return InHomeVisitIcon;
        case /skin|coat|fur/.test(slug):           return SkinCoatCareIcon;
        case /hair|cut|style|styling|trim/.test(slug): return HaircutStylingIcon;
        case /bath|wash|blow|dry/.test(slug):      return BathBlowDryIcon;
        case /maint|clean|brush/.test(slug):       return MaintenanceCleanIcon;
        case /full|body|groom/.test(slug):         return FullBodyGroomingIcon;
        default:                                   return FullBodyGroomingIcon;
    }
}