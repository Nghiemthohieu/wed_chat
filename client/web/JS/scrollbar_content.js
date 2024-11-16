// Lấy các phần tử thanh cuộn và nội dung
const container = document.querySelector('.virtualized-scroll');
const content = document.querySelector('.ReactVirtualized__Grid__innerScrollContainer');
const ReactVirtualized__Grid = document.querySelector('.ReactVirtualized__Grid.ReactVirtualized__List');
const scrollbarHorizontal = document.querySelector('.scrollbar-horizontal');
const thumbHorizontal = document.querySelector('.scroll-thumb-horizontal');
const scrollbarVertical = document.querySelector('.scrollbar-vertical');
const thumbVertical = document.querySelector('.scroll-thumb-vertical');

// Lấy tất cả các msg-item
const msgItems = document.querySelectorAll('.msg-item');
const height_messeges = msgItems[0].offsetHeight; // Lấy chiều cao của 1 msg-item
const sum_messege = msgItems.length; // Đếm số lượng msg-item

// Cập nhật kích thước và hiển thị thanh cuộn nếu nội dung tràn
function updateScrollbars() {
    const totalHeight = height_messeges * sum_messege; // Tổng chiều cao các phần tử msg-item
    content.style.height = `${totalHeight}px`;
    ReactVirtualized__Grid.style.height = `${totalHeight}px`;

    // Xử lý thanh cuộn ngang
    if (content.scrollWidth > container.clientWidth) {
        scrollbarHorizontal.style.display = 'block'; // Hiển thị thanh cuộn ngang
        const thumbWidth = (container.clientWidth / content.scrollWidth) * container.clientWidth;
        thumbHorizontal.style.width = `${thumbWidth}px`;
    } else {
        scrollbarHorizontal.style.display = 'none'; // Ẩn thanh cuộn ngang
    }

    // Xử lý thanh cuộn dọc
    if (content.scrollHeight > container.clientHeight) {
        scrollbarVertical.style.display = 'block'; // Hiển thị thanh cuộn dọc
        const thumbHeight = (container.clientHeight / content.scrollHeight) * container.clientHeight;
        thumbVertical.style.height = `${thumbHeight}px`;
    } else {
        scrollbarVertical.style.display = 'none'; // Ẩn thanh cuộn dọc
    }

    // Cập nhật vị trí thanh cuộn
    updateScrollbarPosition();
}
// Cập nhật vị trí của thanh cuộn khi người dùng cuộn nội dung
function updateScrollbarPosition() {
    const scrollTop = content.scrollTop; // Vị trí cuộn hiện tại của nội dung
    const scrollHeight = content.scrollHeight - container.clientHeight; // Chiều cao thực của phần cuộn trừ đi chiều cao container
    // Tính toán tỷ lệ của vị trí cuộn so với toàn bộ chiều cao cuộn
    const verticalRatio = scrollTop / scrollHeight;

    // Cập nhật vị trí của thanh cuộn dọc theo tỷ lệ cuộn của nội dung
    const thumbTop = verticalRatio * (container.clientHeight - thumbVertical.offsetHeight);

    // Thay đổi vị trí thanh cuộn bằng transform
    thumbVertical.style.transform = `translateY(${thumbTop}px)`;
}

// Lắng nghe sự kiện resize để cập nhật lại thanh cuộn khi thay đổi kích thước
window.addEventListener('resize', updateScrollbars);

// Khởi tạo khi trang được tải
updateScrollbars();

// Cập nhật vị trí của các .msg-item để chúng không chồng lên nhau
let topOffset = 0; // Độ lệch top ban đầu

msgItems.forEach((item) => {
    const itemHeight = item.offsetHeight;
    item.style.position = 'absolute'; // Đảm bảo vị trí tuyệt đối cho các phần tử
    item.style.top = `${topOffset}px`; // Đặt vị trí top cho từng phần tử
    topOffset += itemHeight + 10; // 10px là khoảng cách giữa các phần tử
});

// Kéo thanh cuộn ngang
let isDraggingHorizontal = false;

thumbHorizontal.addEventListener('mousedown', (e) => {
    isDraggingHorizontal = true;
    const thumbWidth = thumbHorizontal.offsetWidth;

    const onMouseMove = (moveEvent) => {
        if (!isDraggingHorizontal) return;

        const mouseX = moveEvent.clientX - container.getBoundingClientRect().left; // Vị trí chuột theo container
        const thumbLeft = Math.max(0, Math.min(mouseX - thumbWidth / 2, container.clientWidth - thumbWidth));
        thumbHorizontal.style.transform = `translateX(${thumbLeft}px)`; // Thay đổi vị trí bằng transform

        const scrollLeft = (thumbLeft / (container.clientWidth - thumbWidth)) * (content.scrollWidth - container.clientWidth);
        content.scrollLeft = scrollLeft;
    };

    const onMouseUp = () => {
        isDraggingHorizontal = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Kéo thanh cuộn dọc
let isDraggingVertical = false;
let startMouseY = 0;  // Lưu vị trí bắt đầu chuột
let startScrollTop = 0;  // Lưu vị trí cuộn hiện tại khi bắt đầu kéo

thumbVertical.addEventListener('mousedown', (e) => {
    isDraggingVertical = true;
    startMouseY = e.clientY;  // Lưu vị trí chuột khi bắt đầu kéo
    startScrollTop = content.scrollTop;  // Lưu vị trí cuộn hiện tại của nội dung

    const thumbHeight = thumbVertical.offsetHeight;

    const onMouseMove = (moveEvent) => {
        if (!isDraggingVertical) return;

        // Tính toán sự thay đổi vị trí chuột
        const deltaY = moveEvent.clientY - startMouseY;

        // Tính toán vị trí mới của thanh cuộn dựa trên vị trí chuột và chiều cao của thumb
        const thumbTop = Math.max(0, Math.min((startScrollTop + deltaY) / (content.scrollHeight - container.clientHeight) * (container.clientHeight - thumbHeight), container.clientHeight - thumbHeight));
        
        // Thay đổi vị trí thanh cuộn bằng transform
        thumbVertical.style.transform = `translateY(${thumbTop}px)`;

        // Tính toán vị trí cuộn của nội dung dựa trên vị trí thanh cuộn
        const scrollTop = (thumbTop / (container.clientHeight - thumbHeight)) * (content.scrollHeight - container.clientHeight);
        content.scrollTop = scrollTop;
    };

    const onMouseUp = () => {
        isDraggingVertical = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// Cuộn nội dung khi cuộn chuột
container.addEventListener('wheel', (event) => {
    event.preventDefault(); // Ngăn chặn hành vi cuộn mặc định của trình duyệt
    const deltaY = event.deltaY;

    // Giảm tốc độ cuộn bằng cách điều chỉnh hệ số (ví dụ: 0.1 để cuộn chậm hơn)
    const scrollAmount = deltaY * 0.1; // Điều chỉnh hệ số 0.1 để cuộn từ từ

    // Cuộn nội dung một cách từ từ
    content.scrollTop += scrollAmount;

    // Cập nhật vị trí của thanh cuộn dọc sau khi cuộn nội dung
    updateScrollbarPosition();
});
