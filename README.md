# medical-booking :

    - Là website đặt lịch khám bác sĩ

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

        -Bác sĩ :
            + Xem và chỉnh sửa profile của bác sĩ đó (Your profile)
            + Chỉnh sửa các ngày bận (Your schedule)
            + Xem lịch khám các bệnh nhân đã book bác sĩ đó (Booking schedule)

# Một vài điểm còn tồn tại trong lúc code :

    - CSS inline -> responsive hay dùng !important
    - Một vài chỗ đặt tên class theo BEM -> chưa tận dụng tốt 1 vài tiện ích của scss
    - Đặt file scss cạnh file js
