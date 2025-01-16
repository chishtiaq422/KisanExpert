export class StatusModel {
    public IsSuccess: boolean =false;
    public ErrorDetails?: string;
    public Id?:number;
    public httpStatusCode?: number;
}

export class PaginationModel {
    constructor()
    {
        this.Search='';
    }
    public PageSize?: number;
    public CurrentPage?: number;
   public Search?: string;
}

export class ModelValidationDto{

    ErrorMessage: any;
    Field: any;
}