export function numberToShortVietnameseWords(number: number) {
  const strNumber = number.toString() // Chuyển số thành chuỗi

  // Kiểm tra độ dài của chuỗi số
  if (strNumber.length <= 3) {
    return strNumber // Trả về số ban đầu nếu không cần chuyển đổi
  } else {
    const suffixes = ['', 'k', 'tr'] // Định nghĩa các hậu tố ký tự

    // Tìm độ dài chuỗi con không chứa số 0 từ phải qua trái
    let i = strNumber.length - 1
    while (i >= 0 && strNumber[i] === '0') {
      i--
    }

    // Chia chuỗi thành các phần nguyên và thập phân
    const integerPart = strNumber.slice(0, i + 1)
    const decimalPart = strNumber.slice(i + 1)

    // Tính chỉ số hậu tố dựa trên độ dài chuỗi phần nguyên
    const suffixIndex = Math.floor((integerPart.length - 1) / 3)

    // Ghép phần nguyên và hậu tố
    let result = integerPart.slice(0, integerPart.length - suffixIndex * 3)
    if (decimalPart !== '') {
      result += '.' + decimalPart
    }
    result += suffixes[suffixIndex]

    return result
  }
}

export function formatVND(money: number) {
  return money.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  })
}
