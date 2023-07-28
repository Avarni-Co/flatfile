import {
    scopeOneCategories,
    scopeThreeCategories,
    scopeTwoCategories,
} from './constants';

export enum EUserOrgEmailStatus {
    Invited = 'invited',
    Accepted = 'accepted',
}
export interface UserOrgBase {
    email: string;
    orgId: string;
    orgName: string;
    role: 'admin' | 'user' | 'viewer';
    emailStatus?: EUserOrgEmailStatus;
}

export interface SubOrg {
    id: string;
    name: string;
    subOrgs: SubOrg[];
}

export interface UserOrg extends UserOrgBase {
    _id: string;
}

export type ScopeTwoCategories = typeof scopeTwoCategories[number];
export type ScopeOneCategories = typeof scopeOneCategories[number];
export type ScopeThreeCategories = typeof scopeThreeCategories[number];
export type EmissionCategories = ScopeOneCategories | ScopeTwoCategories | ScopeThreeCategories;
export type EmissionScope = 1|2|3;