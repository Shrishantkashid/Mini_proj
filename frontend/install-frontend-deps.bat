@echo off
echo ==============================================
echo Installing frontend dependencies...
echo ==============================================

cd /d "C:\Users\Admin\Desktop\Mini Project\frontend"

npm install react react-dom react-router-dom @vitejs/plugin-react vite ^
 eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals ^
 @types/react @types/react-dom

echo.
echo ==============================================
echo ✅ Installation complete! Now run: npm run dev
echo ==============================================
pause
