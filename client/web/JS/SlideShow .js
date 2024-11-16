const slideshowContent = document.querySelector('.slideshow__content'); // Chọn phần tử .slideshow__content
const slideshowPages = document.querySelectorAll('.slideshow__page'); // Chọn tất cả phần tử .slideshow__page
let currentLeft = 0; // Bắt đầu từ vị trí 0%
const slideWidth = 100; // Giá trị thay đổi mỗi lần (ở đây là -100%)
const numberSlideshowPage = slideshowPages.length;
const sumLeft = (numberSlideshowPage - 1) * -100;
const slideshowBottomDot = document.querySelectorAll('.slideshow__bottom__dot');
let current = 0; // Chỉ số trang hiện tại
const btnLeft = document.querySelector('.slideshow__prev');
const btnRight = document.querySelector('.slideshow__next');

// Hàm để cập nhật slide
const updateSlide = () => {
    // Cập nhật dot
    slideshowBottomDot.forEach(dot => dot.classList.remove('selected'));
    slideshowBottomDot[current].classList.add('selected');

    // Thiết lập giá trị left cho slideshowContent
    slideshowContent.style.left = `${currentLeft}%`;
}

// Hàm thay đổi slide tự động
const handleChangeSlide = () => {
    current++; // Tăng chỉ số trang hiện tại
    currentLeft -= slideWidth; // Giảm left để di chuyển sang trái

    // Kiểm tra nếu vượt quá số lượng trang
    if (current >= numberSlideshowPage) {
        current = 0; // Nếu đến cuối thì quay lại đầu
        currentLeft = 0;
    }

    updateSlide(); // Cập nhật slide
}

// Thiết lập interval ban đầu
let slideInterval = setInterval(handleChangeSlide, 4000);

// Xử lý click cho nút phải
btnRight.addEventListener('click', () => {
    clearInterval(slideInterval); // Dừng interval hiện tại
    handleChangeSlide(); // Gọi hàm để chuyển slide
    slideInterval = setInterval(handleChangeSlide, 4000); // Tạo interval mới
});

// Xử lý click cho nút trái
btnLeft.addEventListener('click', () => {
    clearInterval(slideInterval); // Dừng interval hiện tại
    current--; // Giảm chỉ số trang hiện tại
    if (current < 0) {
        current = numberSlideshowPage - 1; // Nếu ở đầu thì quay về cuối
        currentLeft = sumLeft; // Đặt lại left về -400%
    } else {
        currentLeft += slideWidth; // Tăng left để di chuyển về trang trước
    }
    
    updateSlide(); // Cập nhật slide
    slideInterval = setInterval(handleChangeSlide, 4000); // Tạo interval mới
});

// Xử lý click cho dot
slideshowBottomDot.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval); // Dừng interval hiện tại
        current = index; // Cập nhật chỉ số hiện tại theo dot được nhấn
        currentLeft = index * -slideWidth; // Tính toán vị trí left
        updateSlide(); // Cập nhật slide
        slideInterval = setInterval(handleChangeSlide, 4000); // Tạo interval mới
    });
});
