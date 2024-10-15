export const ordersToMonthlyHistory = (orders) => {
    const orderHistory = []
    orders.forEach((order) => {
        const month = new Date(order.created_at).toLocaleString('default', { month: 'long'});
        const existing = orderHistory.find((item) => item.month === month);
        if (existing) {
            existing.orders++;
            existing.averageQuotation += order.quotation;
        } else {
            orderHistory.push({ month, orders: 1, averageQuotation: order.quotation });
        }
    });
    orderHistory.forEach((item) => item.averageQuotation /= item.orders);
    return orderHistory;
}