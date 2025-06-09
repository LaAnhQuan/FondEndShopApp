export const ORDER_STATUS = {
    PENDING: 1,
    PROCESSING: 2,
    SHIPPED: 3,
    DELIVERED: 4,
    CANCELLED: 5,
    REFUNDED: 6,
    FAILED: 7,
};

export const getStatusName = (statusCode: number): string => {
    switch (statusCode) {
        case ORDER_STATUS.PENDING:
            return "Đang chờ xử lý";
        case ORDER_STATUS.PROCESSING:
            return "Đang xử lý";
        case ORDER_STATUS.SHIPPED:
            return "Đã giao hàng";
        case ORDER_STATUS.DELIVERED:
            return "Đã nhận hàng";
        case ORDER_STATUS.CANCELLED:
            return "Đã hủy";
        case ORDER_STATUS.REFUNDED:
            return "Đã hoàn tiền";
        case ORDER_STATUS.FAILED:
            return "Thất bại";
        default:
            return "Không xác định";
    }
};


export const dateTimeFormatter = (isoString: string) => {
    // Tạo đối tượng Date từ chuỗi ISO
    const date = new Date(isoString);

    // Lấy các thành phần ngày, tháng, năm, giờ, phút
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Trả về chuỗi định dạng "dd/mm/yyyy hh:mm"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const currencyFormatter = (value: any) => {
    const options = {
        significantDigits: 2,
        thousandsSeparator: '.',
        decimalSeparator: ',',
        symbol: 'đ'
    }

    if (typeof value !== 'number') value = 0.0
    value = value.toFixed(options.significantDigits)

    const [currency, decimal] = value.split('.')
    return `${currency.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        options.thousandsSeparator
    )}${options.symbol}`
}

