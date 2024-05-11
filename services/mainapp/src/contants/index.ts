export const CategoryIcon = (category: string) =>{
    switch (category){ 
        case "Lương" : 
            return 'cash-multiple'
        case "Tiền thưởng" : 
            return 'hand-coin-outline'
        case "Tiền lãi" : 
            return 'arrow-projectile'
        case "Tiền mua sắm" : 
            return 'shopping-outline'
        case "Tiền ăn uống" : 
            return 'food'
        case "Tiền đi lại" : 
            return 'walk'
        case "Tiền giải trí" : 
            return 'gamepad-variant-outline'
        case "Tiền y tế" : 
            return 'account-heart-outline'
        case "Tiền nhà cửa" : 
            return 'greenhouse'
        case "Tiền học phí" : 
            return 'book-open-outline'
        case "Tiền bảo hiểm" : 
            return 'heart-box-outline'
        case "Tiết kiệm" : 
            return 'chart-arc'
        case "Đầu tư" : 
            return 'chart-bell-curve'
        case "Trả nợ" : 
            return 'card-account-details-outline'
        case "Thanh toán thẻ" : 
            return 'card'
        case "Thu nhập phụ" : 
            return 'card-account-details-star'
        case "Chi tiêu đặc biệt": 
            return 'chess-queen'
        case "Chuyển tiền": 
            return 'bank-transfer'
    }
}