# Implementación de Impresión de Tickets de Cliente

Este documento describe cómo implementar la funcionalidad de impresión de tickets con los datos del cliente (sin productos) en el sistema de gestión de pedidos.

## 📋 Descripción

La funcionalidad permite imprimir un ticket formateado con los datos del cliente, información del pedido, datos de pago y totales, optimizado para impresoras de tickets de 80mm.

## 🔧 Cambios Necesarios

### 1. Actualizar Importaciones

**Archivo:** `client/src/components/admin/AdminOrders.tsx`

Agregar el icono `Printer` a las importaciones de `lucide-react`:

```typescript
import { Eye, Package, CheckCircle, XCircle, Clock, Truck, RefreshCw, Printer } from "lucide-react";
```

### 2. Agregar Función de Impresión

**Archivo:** `client/src/components/admin/AdminOrders.tsx`

Agregar la función `handlePrintTicket` después de la función `handleStatusChange`:

```typescript
const handlePrintTicket = (order: Order) => {
  // Crear una ventana nueva para imprimir
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const statusInfo = statusMap[order.status as keyof typeof statusMap] || statusMap.pending;
  const paymentStatusMap: Record<string, string> = {
    pending: 'No confirmado',
    approved: 'Aprobado',
    rejected: 'Rechazado',
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Ticket de Pedido - ${order.customerName}</title>
        <style>
          @media print {
            @page {
              size: 80mm auto;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 10mm;
            }
          }
          body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            line-height: 1.4;
            margin: 0;
            padding: 10mm;
            max-width: 80mm;
          }
          .header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
          }
          .section {
            margin: 10px 0;
            padding: 5px 0;
            border-bottom: 1px dashed #ccc;
          }
          .section:last-child {
            border-bottom: none;
          }
          .section-title {
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 5px;
            text-transform: uppercase;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin: 3px 0;
          }
          .label {
            font-weight: bold;
          }
          .value {
            text-align: right;
          }
          .total {
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px dashed #000;
          }
          .footer {
            text-align: center;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px dashed #ccc;
            font-size: 10px;
          }
          .status-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: bold;
          }
          .status-pending { background: #fef3c7; }
          .status-approved { background: #d1fae5; }
          .status-rejected { background: #fee2e2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>FV FARMACIA</h1>
          <p>Ticket de Pedido</p>
        </div>

        <div class="section">
          <div class="section-title">Datos del Cliente</div>
          <div class="row">
            <span class="label">Nombre:</span>
            <span class="value">${order.customerName}</span>
          </div>
          <div class="row">
            <span class="label">Teléfono:</span>
            <span class="value">${order.customerPhone}</span>
          </div>
          ${order.customerEmail ? `
          <div class="row">
            <span class="label">Email:</span>
            <span class="value">${order.customerEmail}</span>
          </div>
          ` : ''}
          ${order.customerAddress ? `
          <div class="row">
            <span class="label">Dirección:</span>
            <span class="value">${order.customerAddress}</span>
          </div>
          ` : ''}
        </div>

        <div class="section">
          <div class="section-title">Información del Pedido</div>
          <div class="row">
            <span class="label">Fecha:</span>
            <span class="value">${new Date(order.createdAt).toLocaleString('es-ES')}</span>
          </div>
          <div class="row">
            <span class="label">Estado:</span>
            <span class="value">${statusInfo.label}</span>
          </div>
          <div class="row">
            <span class="label">ID Pedido:</span>
            <span class="value">${order.id.substring(0, 8)}...</span>
          </div>
        </div>

        ${(order.paymentBank || order.paymentCI || order.paymentPhone) ? `
        <div class="section">
          <div class="section-title">Datos de Pago</div>
          ${order.paymentBank ? `
          <div class="row">
            <span class="label">Banco:</span>
            <span class="value">${getBankName(order.paymentBank)}</span>
          </div>
          ` : ''}
          ${order.paymentCI ? `
          <div class="row">
            <span class="label">Documento:</span>
            <span class="value">${order.paymentCI}</span>
          </div>
          ` : ''}
          ${order.paymentPhone ? `
          <div class="row">
            <span class="label">Teléfono:</span>
            <span class="value">${order.paymentPhone}</span>
          </div>
          ` : ''}
          <div class="row">
            <span class="label">Estado de Pago:</span>
            <span class="value">
              <span class="status-badge status-${order.paymentStatus || 'pending'}">
                ${paymentStatusMap[order.paymentStatus || 'pending']}
              </span>
            </span>
          </div>
        </div>
        ` : ''}

        ${order.notes ? `
        <div class="section">
          <div class="section-title">Notas</div>
          <p>${order.notes}</p>
        </div>
        ` : ''}

        <div class="section total">
          <div class="row">
            <span>Total en USD:</span>
            <span>$${parseFloat(order.total).toFixed(2)}</span>
          </div>
          ${order.totalInBolivares ? `
          <div class="row">
            <span>Total en Bs.:</span>
            <span>Bs. ${parseFloat(order.totalInBolivares).toLocaleString('es-VE', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}</span>
          </div>
          ` : ''}
        </div>

        <div class="footer">
          <p>Gracias por su compra</p>
          <p>${new Date().toLocaleString('es-ES')}</p>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Esperar a que se cargue el contenido y luego imprimir
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print();
      // Cerrar la ventana después de imprimir (opcional)
      // printWindow.close();
    }, 250);
  };
};
```

**Nota:** Esta función requiere que exista la función `getBankName` que convierte el código del banco a su nombre completo. Si no existe, puedes agregarla o modificar el código para usar directamente `order.paymentBank`.

### 3. Agregar Botón de Imprimir en el JSX

**Archivo:** `client/src/components/admin/AdminOrders.tsx`

En la sección donde se muestran los controles de cada pedido (junto al selector de estado y el botón "Ver detalles"), agregar el botón de imprimir:

```tsx
<div className="flex items-center gap-2 flex-wrap">
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
    onClick={() => handlePrintTicket(order)}
    title="Imprimir ticket del cliente"
  >
    <Printer className="h-4 w-4 mr-2" />
    Imprimir
  </Button>
  <Button
    variant="outline"
    size="sm"
    onClick={() => handleViewOrder(order)}
  >
    <Eye className="h-4 w-4 mr-2" />
    Ver detalles
  </Button>
</div>
```

## 📝 Contenido del Ticket

El ticket incluye la siguiente información (sin productos):

1. **Encabezado:**
   - Nombre de la empresa: "FV FARMACIA"
   - Título: "Ticket de Pedido"

2. **Datos del Cliente:**
   - Nombre completo
   - Teléfono
   - Email (si existe)
   - Dirección (si existe)

3. **Información del Pedido:**
   - Fecha y hora de creación
   - Estado del pedido
   - ID del pedido (primeros 8 caracteres)

4. **Datos de Pago** (si existen):
   - Banco emisor (nombre completo)
   - Documento afiliado
   - Teléfono afiliado
   - Estado de pago (con badge de color)

5. **Notas** (si existen):
   - Notas adicionales del pedido

6. **Totales:**
   - Total en USD
   - Total en Bs. (si existe)

7. **Pie de página:**
   - Mensaje: "Gracias por su compra"
   - Fecha y hora actual

## 🎨 Características del Formato

- **Tamaño:** Optimizado para impresoras de tickets de 80mm de ancho
- **Fuente:** Courier New (monospace) para mejor legibilidad
- **Estilos de impresión:** Configurados con `@media print`
- **Separadores:** Líneas punteadas entre secciones
- **Badges de estado:** Colores diferenciados para estados de pago:
  - Amarillo: No confirmado
  - Verde: Aprobado
  - Rojo: Rechazado

## 🚀 Funcionamiento

1. El usuario hace clic en el botón "Imprimir" en cualquier pedido
2. Se abre una nueva ventana con el ticket formateado
3. Se activa automáticamente el diálogo de impresión del navegador
4. El usuario selecciona la impresora y confirma
5. El ticket se imprime con el formato optimizado

## ⚙️ Personalización

### Cambiar el nombre de la empresa

En la función `handlePrintTicket`, buscar y reemplazar:

```typescript
<h1>FV FARMACIA</h1>
```

Por el nombre deseado.

### Cambiar el tamaño del ticket

En los estilos CSS, modificar:

```css
@media print {
  @page {
    size: 80mm auto;  /* Cambiar 80mm por el tamaño deseado (58mm, 80mm, etc.) */
    margin: 0;
  }
}
```

### Agregar más información

Para agregar campos adicionales al ticket, simplemente agrega nuevas secciones en el `htmlContent` siguiendo el mismo patrón de las secciones existentes.

## 📋 Checklist de Implementación

- [ ] Agregar importación de `Printer` de `lucide-react`
- [ ] Agregar función `handlePrintTicket` al componente
- [ ] Agregar botón "Imprimir" en el JSX junto a los otros controles
- [ ] Verificar que la función `getBankName` existe (o adaptar el código)
- [ ] Probar la funcionalidad de impresión
- [ ] Verificar que el formato se vea correcto en la vista previa de impresión
- [ ] Personalizar nombre de empresa si es necesario
- [ ] Ajustar tamaño del ticket según la impresora disponible

## 🔍 Notas Importantes

1. **Función `getBankName`:** Esta función debe existir en el componente para convertir códigos de banco a nombres. Si no existe, puedes:
   - Agregar la función (ver implementación en `AdminOrders.tsx`)
   - O modificar el código para usar directamente `order.paymentBank`

2. **Ventanas emergentes:** Algunos navegadores pueden bloquear ventanas emergentes. Asegúrate de que el navegador permita ventanas emergentes para este sitio.

3. **Impresoras de tickets:** El formato está optimizado para impresoras térmicas de 80mm. Si usas otro tamaño, ajusta los valores en los estilos CSS.

4. **Seguridad:** El código usa template literals con datos del pedido. Asegúrate de que los datos estén sanitizados si provienen de fuentes no confiables.

---

**Fecha de creación:** 2025-01-27  
**Última actualización:** 2025-01-27

