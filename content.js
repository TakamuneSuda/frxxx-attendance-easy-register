console.log("Content script loaded on specified pages");

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === 'setTimes') {
    const { clockIn, clockOut, breakStart, breakEnd } = message.times;
    const inHourField = document.getElementById('approval-request-fields-segment-clock-in-at-hour-0');
    const inMinuteField = document.getElementById('approval-request-fields-segment-clock-in-at-minute-0');
    const outHourField = document.getElementById('approval-request-fields-segment-clock-out-at-hour-0');
    const outMinuteField = document.getElementById('approval-request-fields-segment-clock-out-at-minute-0');
    const breakStartHourField = document.getElementById('approval-request-fields-break-clock-in-at-hour-0');
    const breakStartMinuteField = document.getElementById('approval-request-fields-break-clock-in-at-minute-0');
    const breakEndHourField = document.getElementById('approval-request-fields-break-clock-out-at-hour-0');
    const breakEndMinuteField = document.getElementById('approval-request-fields-break-clock-out-at-minute-0');

    if (inHourField && inMinuteField) {
      inHourField.value = clockIn.slice(0, 2);
      inMinuteField.value = clockIn.slice(2);
    }
    if (outHourField && outMinuteField) {
      outHourField.value = clockOut.slice(0, 2);
      outMinuteField.value = clockOut.slice(2);
    }

    if (breakStartHourField && breakStartMinuteField) {
      breakStartHourField.value = breakStart.slice(0, 2);
      breakStartMinuteField.value = breakStart.slice(2);
    }
    if (breakEndHourField && breakEndMinuteField) {
      breakEndHourField.value = breakEnd.slice(0, 2);
      breakEndMinuteField.value = breakEnd.slice(2);
    }
  }
});

const url = new URL(window.location.href);
const hash = url.hash;

// ハッシュ部分があるか確認
if (hash) {
  // ハッシュ部分からクエリパラメータを解析
  const hashParamsString = hash.substring(hash.indexOf("?") + 1);
  const hashParams = new URLSearchParams(hashParamsString);

  // クエリパラメータをチェック
  if (hashParams.get("type") === "ApprovalRequest::WorkTime") {
    // ページが完全に読み込まれるのを待つ
    window.addEventListener("load", function () {

      chrome.runtime.sendMessage({ action: 'openPopup' });
      // 追加ボタンをクリック
      const add_button = document.querySelector(
        "button.vb-button.vb-button--appearanceSecondary.vb-button--small.vb-button--rightIcon .vb-button__text"
      );
      if (add_button && add_button.textContent === "追加") {
        add_button.parentElement.click();
      }

      // 1秒待ってから休憩ボタンをクリック
      setTimeout(function () {
        const add_rest_button = document.querySelector(
          'button[data-test="休憩を追加"]'
        );
        if (add_rest_button) {
          add_rest_button.click();
        }
      }, 1500);
    });
  }
}