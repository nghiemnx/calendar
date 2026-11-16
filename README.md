# calendar

Lịch âm dương Việt Nam, hiển thị ngày dương và ngày âm trong cùng một lịch tháng.

## Chạy local

```bash
yarn install
yarn dev
```

Mở `http://localhost:3000`.

## Kiểm tra và build static export

```bash
yarn lint
yarn typecheck
yarn test
yarn build
python3 -m http.server 4173 --bind 127.0.0.1 --directory out
```

Mở `http://127.0.0.1:4173/` để kiểm tra bản static export trong `out/`.

Ngày âm được tính trong trình duyệt theo lịch Việt Nam UTC+7. Ứng dụng không dùng backend hoặc API.
