export type Tag = {
    id:           number;
    name:         Name;
    slug:         Name;
    type:         string;
    order_column: number;
    created_at:   Date;
    updated_at:   Date;
}
export type Name = {
    es: string;
}