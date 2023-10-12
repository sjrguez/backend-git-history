export interface BranchI {
    name:           string;
    commit:         Commit;
    protected:      boolean;
    protection:     Protection;
    protection_url: string;
}

export interface Commit {
    sha: string;
    url: string;
}

export interface Protection {
    enabled:                boolean;
    required_status_checks: RequiredStatusChecks;
}

export interface RequiredStatusChecks {
    enforcement_level: string;
    contexts:          any[];
    checks:            any[];
}
