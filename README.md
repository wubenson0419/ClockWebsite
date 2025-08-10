# [網頁小時鐘]()
[English Version](README_EN.md)　[繁體中文版](README.md)
---
## 簡介
網頁小時鐘是一個簡單且美觀的網頁應用程式，提供即時的時間顯示功能，並支援使用者自訂顏色與字型。此專案適合用於學習、展示以及個人化的時間顯示需求。


## 功能特色
- **即時時間顯示**：顯示當前時間，並支援本地時間校準。
- **自訂功能**：使用者可以自訂時間顯示的顏色與字型，並支援偏好設定的本地儲存。
- **全螢幕模式**：支援進入與退出全螢幕模式，提升使用體驗。
- **PWA 支援**：可安裝為進階網頁應用程式，支援離線使用(加載時需有網路連線)。
- **響應式設計**：適配各種裝置，提供最佳的使用體驗。

## 使用說明
1. 開啟 `index.html` 即可啟動應用程式。
2. 使用者可以透過右上角的自訂面板調整時間顯示的顏色與字型。
3. 點擊全螢幕按鈕可進入全螢幕模式，再次點擊可退出。
4. 點擊復原按鈕可將顏色與字型恢復為預設值。

## 專案結構
- `index.html`：主頁面，包含基本結構與引用的資源。
- `styles.css`：樣式表，定義了頁面的外觀與排版。
- `scripts.js`：JavaScript 檔案，包含時間更新、自訂功能與全螢幕邏輯。
- `manifest.json`：PWA 設定檔，定義應用程式的基本資訊。
- `sw.js`：Service Worker，實現離線快取功能。
- `ClockWebsite_04_19.png`：應用程式圖示。
- `ClockWebsite_icon.png`：分頁圖示。

## 安裝與部署
1. 將專案檔案下載或克隆到本地。
2. 使用瀏覽器開啟 `index.html` 即可使用。
3. 若需部署到伺服器，將所有檔案上傳至伺服器的根目錄。

## 開發者
- **作者**：BensonWu
<!-- - **聯絡方式**：請透過 GitHub 提交問題或建議。 -->

## 授權

本專案採用 [MIT 授權](./LICENSE)。您可以自由使用、修改和分發本程式碼，但需保留原始版權聲明和授權條款。

## 字體來源

本專案使用以下字體：
- [Major Mono Display](https://fonts.google.com/specimen/Major+Mono+Display)
- [Arial](https://docs.microsoft.com/en-us/typography/font-list/arial)
- [Courier New](https://docs.microsoft.com/en-us/typography/font-list/courier-new)
- [Libertinus Mono](https://github.com/alerque/libertinus)
- [B612 Mono](https://github.com/polarsys/b612)
- [Xanh Mono](https://fonts.google.com/specimen/Xanh+Mono)
- [Sixtyfour](https://example.com/sixtyfour)
