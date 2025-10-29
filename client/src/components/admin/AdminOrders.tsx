import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Eye, Package, CheckCircle, XCircle, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Order, OrderItem } from "@shared/schema";

const statusMap = {
  pending: { label: "Pendiente", icon: Clock, color: "bg-yellow-500" },
  confirmed: { label: "Confirmado", icon: CheckCircle, color: "bg-blue-500" },
  preparing: { label: "Preparando", icon: Package, color: "bg-purple-500" },
  ready: { label: "Listo", icon: CheckCircle, color: "bg-green-500" },
  delivered: { label: "Entregado", icon: Truck, color: "bg-green-700" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "bg-red-500" },
};

export default function AdminOrders() {
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const { toast } = useToast();

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      apiRequest(`/api/orders/${id}/status`, { method: 'PATCH', body: { status } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({ title: "Estado actualizado" });
    },
  });

  const handleViewOrder = async (order: Order) => {
    setSelectedOrder(order);
    const items = await apiRequest(`/api/orders/${order.id}/items`);
    setOrderItems(items);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatusMutation.mutate({ id: orderId, status: newStatus });
  };

  if (isLoading) {
    return <div className="p-8 text-center">Cargando pedidos...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold">Gestión de Pedidos</h2>
        <p className="text-muted-foreground">Administra y actualiza el estado de los pedidos</p>
      </div>

      <div className="grid gap-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No hay pedidos registrados
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => {
            const statusInfo = statusMap[order.status as keyof typeof statusMap] || statusMap.pending;
            const StatusIcon = statusInfo.icon;

            return (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">
                        {order.customerName}
                      </CardTitle>
                      <CardDescription className="space-y-1">
                        <div>📞 {order.customerPhone}</div>
                        {order.customerEmail && <div>✉️ {order.customerEmail}</div>}
                        {order.customerAddress && <div>📍 {order.customerAddress}</div>}
                        <div className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleString('es-ES')}
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={`${statusInfo.color} text-white`}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <div className="font-bold text-xl text-primary">
                        ${parseFloat(order.total).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="preparing">Preparando</SelectItem>
                        <SelectItem value="ready">Listo</SelectItem>
                        <SelectItem value="delivered">Entregado</SelectItem>
                        <SelectItem value="cancelled">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </Button>
                  </div>
                  {order.notes && (
                    <div className="mt-3 p-3 bg-muted rounded-md">
                      <p className="text-sm"><strong>Notas:</strong> {order.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Pedido</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-1">Cliente</h4>
                  <p>{selectedOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedOrder.customerPhone}</p>
                  {selectedOrder.customerEmail && (
                    <p className="text-sm text-muted-foreground">{selectedOrder.customerEmail}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Fecha</h4>
                  <p>{new Date(selectedOrder.createdAt).toLocaleString('es-ES')}</p>
                </div>
              </div>

              {selectedOrder.customerAddress && (
                <div>
                  <h4 className="font-semibold mb-1">Dirección de entrega</h4>
                  <p>{selectedOrder.customerAddress}</p>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-2">Productos</h4>
                <div className="border rounded-md">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border-b last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.measurementType === 'weight'
                            ? `${parseFloat(item.quantity) >= 1000 
                                ? `${(parseFloat(item.quantity) / 1000).toFixed(2)} kg` 
                                : `${item.quantity} g`}`
                            : `${item.quantity} unidad${parseFloat(item.quantity) > 1 ? 'es' : ''}`
                          }
                          {' @ '}${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <div className="font-semibold">
                        ${parseFloat(item.subtotal).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-muted font-bold">
                    <span>Total</span>
                    <span className="text-primary">${parseFloat(selectedOrder.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
