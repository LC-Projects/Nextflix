export interface AuthI {
    api_key: string | null
    account_id: string | null
    loading: boolean
    error: string | null
    reload: boolean
}

export interface AuthenticationI {
    status_code: number
    status_message: string
    success: boolean
}