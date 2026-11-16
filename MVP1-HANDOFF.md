# MVP1 · Lịch âm dương Việt Nam

**Handoff cho Luna.** Xây dựng website tiếng Việt, dùng được trên điện thoại và desktop. Mở trang là thấy ngay tháng hiện tại cùng ngày âm và ngày dương. Chọn một ngày để đọc chi tiết. Bàn giao mã nguồn và bản build tĩnh đã chạy thử từ thư mục `out/`.

## 1. Phạm vi và công nghệ

- Một trang `/` gồm lịch tháng, điều hướng tháng/năm và chi tiết ngày. Dùng lịch dương làm trục hiển thị, mỗi ô có ngày âm tương ứng.
- **Next.js App Router, React, TypeScript, CSS Grid, shadcn/ui và Yarn.** Dùng bản Next.js ổn định `16.4.6`, lưu `yarn.lock` và `packageManager: yarn@1.22.22` để tái lập bản build. [Next.js v16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6)
- MVP1 tập trung vào tra cứu theo ngày dương và hiển thị ngày âm Việt Nam. Phạm vi chọn ngày là tháng 01/2000 đến tháng 12/2050, tính theo lịch dương. Mọi thao tác xem lịch chạy trong trình duyệt.
- Giao diện gồm `src/app/layout.tsx` với `lang="vi"` và metadata, `src/app/page.tsx` làm trang chính, `src/components/Calendar.tsx` cho phần tương tác và `src/app/globals.css` cho bố cục. Đặt logic lịch cùng kiểm thử trong `src/lib/calendar.ts` và `src/lib/calendar.test.ts`. Giữ quy đổi độc lập với React.

## 2. Giao diện và thao tác

**Cảm giác như lịch giấy Việt Nam hiện đại.** Dùng nền ngà `#F8F6EF`, chữ đậm `#25332D`, xanh lá trầm `#335B45` cho ngày đang chọn. Đường kẻ mảnh, khoảng trắng thoáng, chữ tiếng Việt rõ dấu. Dùng font hệ thống cho nội dung và chữ số có độ rộng đều trong lưới. Tiêu đề ngắn **Lịch âm dương**. Ưu tiên diện tích cho lưới và thông tin ngày.

- **Thanh điều hướng.** Có nút tháng trước và tháng sau, nhãn tháng/năm và nút **Hôm nay**. Bấm nhãn tháng/năm để mở bộ chọn **Tháng** và **Năm** có nhãn rõ ràng. Nút **Áp dụng** đưa người dùng đến ngày 1 dương lịch của tháng đã chọn. Khi bấm tháng trước/sau, giữ số ngày đang chọn nếu có, hoặc chọn ngày cuối của tháng đích. Ở hai đầu phạm vi, vô hiệu hóa nút đi ra ngoài phạm vi.
- **Lưới lịch.** Bắt đầu từ thứ Hai, cột ghi `T2 T3 T4 T5 T6 T7 CN`. Dùng 4–6 hàng theo số tuần thực tế. Ô ngoài tháng để trống. Ngày dương nằm trên, đậm và lớn hơn. Ngày âm ở dưới, ví dụ `15` hoặc `1/10` khi sang tháng âm. Gạch chân số âm của mùng 1 và ngày rằm. Thêm chú thích ngắn **Dương lịch · Âm lịch** theo đúng thứ tự hiển thị.
- **Ngày đang chọn và hôm nay.** Ngày đang chọn có nền xanh đậm. Hôm nay có viền riêng để nhận ra kể cả khi người dùng đang xem ngày khác. Ô hôm nay dùng `aria-current="date"`. Mỗi nút ngày có tên đọc đầy đủ cả ngày dương lẫn ngày âm, kể cả chữ **nhuận** khi áp dụng.
- **Chi tiết.** Hiển thị thứ, ngày dương dạng `dd/mm/yyyy` và ngày tháng năm âm đầy đủ. Ví dụ **Thứ Ba · 17/02/2026** và **Mùng 1 tháng Giêng năm 2026 âm lịch**. Ngày 15 âm lịch có nhãn **Rằm**. Tháng âm nhuận ghi rõ **tháng … nhuận**. Chi tiết cập nhật tại chỗ khi chọn ngày.
- **Điện thoại.** Giữ đủ 7 cột từ 320 px, đặt chi tiết ngay dưới lưới. Thanh điều hướng được xuống dòng khi cần. Ô ngày cao tối thiểu 44 px, số âm tối thiểu 12 px, thao tác chạm không cần vuốt hoặc rê chuột.
- **Desktop.** Từ 900 px, đặt chi tiết bên phải lưới, căn đầu với lưới và giới hạn chiều rộng tổng thể khoảng 1.080 px. Dùng cùng component với bản điện thoại. Các nút có focus rõ ràng và thao tác được bằng bàn phím với Tab, Enter và Space.

## 3. Quy đổi và trạng thái

1. Dùng kiểu ngày dương dạng `{ year, month, day }`, tháng từ 1 đến 12. Ưu tiên `@lichta/core` qua một hàm quy đổi duy nhất, nhận ngày dương và trả `{ year, month, day, isLeap }`. Gọi `LichTa.toLunar(day, month, year, 7)` để áp dụng UTC+7. Xác nhận cài được package, khóa phiên bản và chạy các mốc đối chiếu bên dưới trước khi dùng vào giao diện. [API LichTa](https://github.com/zeforc/lichta) · [Quy tắc lịch âm của Hồ Ngọc Đức](https://www.xemamlich.uhm.vn/calrules.html)
2. Dựng lưới bằng các hàm thuần cho thứ trong tuần, số ngày của tháng và đổi tháng qua ranh giới năm. Nếu dùng `Date` cho phép tính lịch dương, dùng `Date.UTC` và các getter UTC. Tách phép tính lịch dương khỏi việc lấy ngày hiện tại theo múi giờ Việt Nam.
3. Lấy **Hôm nay** từ thời điểm hiện tại bằng `Intl.DateTimeFormat` với `timeZone: 'Asia/Ho_Chi_Minh'` và `formatToParts()`. Khởi tạo tháng và ngày chọn sau khi component mount. HTML build sẵn hiển thị tiêu đề và khung lịch có cùng kích thước, để tránh chốt ngày lúc build hoặc lệch hydration. Khi bấm **Hôm nay**, tính lại ngày Việt Nam và đưa lịch về đúng ngày đó. [Client Components trong static export](https://nextjs.org/docs/app/guides/static-exports#browser-apis)

## 4. Thứ tự triển khai

1. **Khởi tạo.** Đặt app tại thư mục dự án, giữ các tài liệu đã có. Cấu hình App Router, TypeScript, ESLint, shadcn/ui và static export. Dùng Yarn cho cài dependency và scripts `dev`, `lint` dùng ESLint, `typecheck` dùng `tsc --noEmit`, `test` dùng `vitest run` và `build` dùng `next build`.
2. **Xác minh dữ liệu trước.** Viết hàm quy đổi, hàm lấy ngày Việt Nam và hàm dựng lưới. Chạy unit test với các mốc lịch âm và các trường hợp đổi tháng ở mục 5.
3. **Hoàn thiện luồng chính trên mobile.** Dựng tháng hiện tại, chọn ngày, chuyển tháng, chọn tháng/năm và nút **Hôm nay**. Chỉnh cỡ chữ, khoảng cách và trạng thái focus. Thêm bố cục desktop bằng CSS.
4. **Kiểm tra và bàn giao.** Chạy kiểm tra mã nguồn, build và mở bản export bằng máy chủ tệp tĩnh cục bộ. Ghi trong README cách chạy dev, chạy kiểm thử và build. Báo lại phiên bản Next.js và thư viện quy đổi đã khóa, kết quả thực tế của các lệnh kiểm tra và trình duyệt đã thử.

## 5. Tiêu chí nghiệm thu

| Hạng mục | Kết quả cần đạt |
| --- | --- |
| Tết và đổi năm âm | `16/02/2026 → 29/12/2025 âm`, `17/02/2026 → 1/1/2026 âm`. [Thông báo của UBND tỉnh Gia Lai](https://iarsai.gialai.gov.vn/upload/105696/20251229/471_TB-UBND_28122025-signed_01_c6185.pdf) |
| Tháng âm nhuận | `21/03/2004 → 1/2/2004 âm` với `isLeap: true`, kèm chữ **nhuận** trong chi tiết. [Ví dụ năm 2004 của Hồ Ngọc Đức](https://www.xemamlich.uhm.vn/calrules.html) |
| Lịch dương và điều hướng | Tháng 02/2024 có 29 ngày. Tháng 02/2026 có 28 ngày và bắt đầu ở cột Chủ nhật. Từ 31/01/2026 bấm tháng sau chọn 28/02/2026. Chuyển qua tháng 12 và tháng 1 cập nhật đúng năm. |
| Hôm nay theo giờ Việt Nam | `2026-11-15T17:05:00Z` cho ngày `16/11/2026` ở Việt Nam, kể cả khi thiết bị đang theo một múi giờ khác. Sau khi chuyển tháng, bấm **Hôm nay** để quay về và chọn ngày Việt Nam hiện tại. |
| Giao diện | Thử ở 320, 390 và 1.280 px. Đọc được cả hai số trong mỗi ô, không cuộn ngang. Chọn ngày bằng chuột, cảm ứng và bàn phím. Kiểm tra trên Safari iOS, Chrome Android và desktop trong phạm vi thiết bị hoặc trình duyệt có sẵn, ghi rõ phần nào đã thử. |
| Bản tĩnh | `out/index.html` và tài nguyên `out/_next/static/` tải được từ máy chủ tệp tĩnh. Sau khi tải lại trang, tháng hiện tại và các thao tác lịch vẫn đúng, không có lỗi hydration hay yêu cầu API để quy đổi ngày. |

## 6. Build và chạy thử bản tĩnh

Đặt cấu hình sau trong `next.config.ts`. `next build` sẽ tạo `out/`. [Next.js Static Export](https://nextjs.org/docs/app/guides/static-exports)

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
}

export default nextConfig
```

Từ thư mục gốc của app, chạy các lệnh sau theo thứ tự.

```bash
yarn install --frozen-lockfile
yarn lint
yarn typecheck
yarn test
yarn build
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

Mở `http://127.0.0.1:4173/`, thử các luồng ở mục 5 trên bản build này rồi dừng máy chủ cục bộ. Thư mục bàn giao bản tĩnh là `out/`.
