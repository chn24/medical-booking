# medical-booking :

    - Là website đặt lịch khám bác sĩ
    - Đã deploy lên Vercel : https://medical-booking.vercel.app/

# Các framework sử dụng :

    - ReactJS 18
    - Material UI

# Các thư viện được dùng :

    - React router
    - React recoil
    - Recoil-persit
    - React-slick
    - moment, date-fns, dayjs
    - Axios
    - formik, yup
    - Fake API qua web : mock API

# Các chức năng

    * Chung :
        - Chia role : Bác sĩ và người khám
        - Đăng nhập, Đăng ký,
        - Xem tin tức (News)
        - Xem danh sách bác sĩ (Doctor list)
        - Xem thông tin của các bác sỹ, các bình luận đánh giá (More Information  trong doctor list)
        - Đặt lịch khám ( vào dưới tư cách bác sĩ sẽ không đặt lịch của bản thân, Booking trong doctor list)
    * Riêng :
        -Người dùng :
            + Xem lịch khám đã đặt (Booking schedules)
                Mỗi ngày :  người dùng chỉ được đặt 2 lần (1 buổi 1 lần)
                            người dùng chỉ được đặt 1 bác sĩ 1 lần
                            bác sĩ chỉ khám 10 người 1 ngày (5 người khác nhau 1 buổi)

        -Bác sĩ :
            + Xem và chỉnh sửa profile của bác sĩ đó (Your profile)
            + Chỉnh sửa các ngày bận (Your schedule)
                Bác sĩ không thể thêm lịch khám vào những lúc có người khám
            + Xem lịch khám các bệnh nhân đã book bác sĩ đó (Booking schedule)

# Các chức năng dự kiến sẽ thêm :

    * Bác sĩ :
        - Đánh dấu người bệnh nhân đã được khám xong hay chưa
        - Thông báo
    * Người dùng :
        - Sau khi được đánh dấu sẽ được đánh giá, bình luận góp ý vào profile của bsi
        - Tìm kiếm lịch khám theo ngày
        - Thông báo
