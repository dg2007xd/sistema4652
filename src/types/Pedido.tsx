import { PedidoDetalle } from "./PedidoDetalle";

export interface Pedido {
    idpedido: number;
    cliente: string;
    fechapedido: string;
    empresaenvio: string;
    destinatario: string;
    vendedor: string;
    detalle: PedidoDetalle[];
}