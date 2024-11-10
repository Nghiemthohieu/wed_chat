import React, { useState, useEffect } from 'react';

const ChatOnboard = () => {
    const slides = [
        {
            imgSrc: "../Image/zbiz_welcome_3x__2__1722484572625_662095.png",
            title: "Kinh doanh hiệu quả với zBusiness Pro",
            subtitle: (
                <>
                    Bán hàng chuyên nghiệp với <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Nhãn Business</span> và
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Hồ sơ kinh doanh,</span> mở khóa tiềm năng
                    <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>tiếp cận khách hàng</span> trên Zalo
                </>
            )
        },
        {
            imgSrc: "../Image/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png",
            title: "Nhắn tin nhiều hơn, soạn thảo ít hơn",
            subtitle: (
                <>
                    Sử dụng <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Tin Nhắn Nhanh</span> để lưu sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ.
                </>
            )
        },
        {
            imgSrc: "../Image/inapp-welcome-screen-04.ade93b965a968b16f2203e9d63b283a7.jpg",
            title: "Trải nghiệm xuyên suốt",
            subtitle: "Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ"
        },
        {
            imgSrc: "../Image/inapp-welcome-screen-03.3f97d49ceecb950d95382b3d8fd4f0f1.png",
            title: "Gửi File nặng?",
            subtitle: "Đã có Zalo PC \"xử\" hết"
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide index
    const [slideInterval, setSlideInterval] = useState(null); // Store the slide interval ID

    // Function to update the slide index
    const updateSlide = (index) => {
        setCurrentIndex(index);
    };

    // Function to change the slide automatically
    const handleChangeSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length); // Loop to the first slide
    };

    // Start the slide interval when component mounts
    useEffect(() => {
        const interval = setInterval(handleChangeSlide, 4000);
        setSlideInterval(interval); // Store interval ID

        return () => clearInterval(interval); // Clear interval on unmount
    }, []);

    // Function to handle button click for next
    const handleNext = () => {
        clearInterval(slideInterval); // Stop the automatic slide change
        updateSlide((currentIndex + 1) % slides.length); // Move to the next slide
        setSlideInterval(setInterval(handleChangeSlide, 4000)); // Restart interval
    };

    // Function to handle button click for previous
    const handlePrev = () => {
        clearInterval(slideInterval); // Stop the automatic slide change
        updateSlide((currentIndex - 1 + slides.length) % slides.length); // Move to the previous slide
        setSlideInterval(setInterval(handleChangeSlide, 4000)); // Restart interval
    };

    // Function to handle dot click
    const handleDotClick = (index) => {
        clearInterval(slideInterval); // Stop the automatic slide change
        updateSlide(index); // Move to the clicked dot slide
        setSlideInterval(setInterval(handleChangeSlide, 4000)); // Restart interval
    };

    return (
        <div id="chatOnboard" className="flx-1 w0">
            <div className="flx flx-col flx-al-c flx-center chat-onboard user-none">
                <div className="chat-onboard__header">
                    <div style={{ marginBottom: '16px' }}>
                        <span data-translate-inner="Chào mừng đến với">Chào mừng đến với</span>&nbsp;<span>Zalo PC!</span>
                    </div>
                    <div data-translate-inner="Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá cho máy tính của bạn.">
                        Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá cho máy tính của bạn.
                    </div>
                </div>
                <div className="flx flx-center slideshow">
                    <div className="slideshow__prev slideshow__btn btn" onClick={handlePrev}>
                        <span className="material-symbols-outlined item">arrow_back_ios_new</span>
                    </div>
                    <div className="flx flx-col slideshow__container flx-al-c" style={{ height: '100%' }}>
                        <div className="flx slideshow__content" style={{ left: `${currentIndex * -100}%`, height: '100%', width: 'calc(100% * 4)', margin: 'auto' }}>
                            {slides.map((page, index) => (
                                <div key={index} className="slideshow__page" style={{ height: '100%', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <img alt={page.title} src={page.imgSrc} className="slideshow__page__image" draggable="false" style={{ objectFit: 'contain', cursor: 'pointer' }} />
                                    <div className="flx flx-col slideshow__page__text">
                                        <span className="slideshow__page__text__title title-rtf" style={{ cursor: 'pointer' }}>
                                            <span className="title-rtf__text">{page.title}</span>
                                        </span>
                                        <span className="subtitle-rtf" style={{ cursor: 'pointer' }}>
                                            {page.subtitle}
                                        </span>
                                        <div className="flx-wrap flx-center mt-12">
                                            <div className="z--btn--v2 btn-secondary medium mr-12 mb-12 --rounded" title="">
                                                <div className="truncate" data-translate-inner="Tìm hiểu thêm">Tìm hiểu thêm</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="slideshow__bottom">
                            {slides.map((_, index) => (
                                <span
                                    key={index}
                                    className={`slideshow__bottom__dot ${currentIndex === index ? 'selected' : ''}`}
                                    onClick={() => handleDotClick(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <div className="slideshow__next slideshow__btn btn" onClick={handleNext}>
                        <span className="material-symbols-outlined">arrow_forward_ios</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatOnboard;
