/**
 * CINE-MARE: Interactive Script (Archive Edition)
 * サイトに「命」と「不気味な連動」を吹き込む制御コード
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. モーダル開閉制御 (MODAL CONTROL)
       カードをクリックした時に詳細画面を出し入れする基本システム
       ============================================================ */
    const cards = document.querySelectorAll('.movie-card');
    const closeButtons = document.querySelectorAll('.close-btn');

    // --- 開く：映画カードをクリックした時の処理 ---
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // ID名から 'card-' を除いた名前（例: hereditary）を特定
            const cardId = card.id.replace('card-', '');
            const targetModal = document.getElementById(`modal-${cardId}`);

            if (targetModal) {
                targetModal.style.display = 'block'; // モーダルを表示
                document.body.style.overflow = 'hidden'; // 背後のサイトが動かないよう固定
            }
        });
    });

    // --- 閉じる：[×]ボタンをクリックした時の処理 ---
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal'); // ボタンの親要素であるモーダルを探す
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // 固定していたスクロールを解除
            }
        });
    });

    // --- 閉じる：黒い背景部分をクリックした時の処理 ---
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- 閉じる：キーボードの「Esc」キーを押した時の処理 ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: block"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });


    /* ============================================================
       2. 教団リンク・双方向ギミック (CULT CONNECTION)
       特定の人物に触れると、裏で繋がっている人物も反応する演出
       ============================================================ */
    const joan = document.getElementById('node-joan');
    const ellen = document.getElementById('node-ellen');

    // ジョーンとエレン、両方の要素が存在する場合のみ実行
    if (joan && ellen) {

        // ジョーンにマウスを乗せると、エレンが「教団の光（赤枠）」を放つ
        joan.addEventListener('mouseenter', () => ellen.classList.add('cult-highlight'));
        joan.addEventListener('mouseleave', () => ellen.classList.remove('cult-highlight'));

        // 逆にエレンにマウスを乗せると、ジョーンも反応する（運命共同体）
        ellen.addEventListener('mouseenter', () => joan.classList.add('cult-highlight'));
        ellen.addEventListener('mouseleave', () => joan.classList.remove('cult-highlight'));
    }
});

//エスター用
function toggleEstherMode() {
    const canvas = document.getElementById('tree-canvas');
    const label = document.getElementById('mode-label');
    const toggle = document.getElementById('toggle-mode');

    if (toggle.checked) {
        canvas.classList.remove('mode-normal');
        canvas.classList.add('mode-reveal');
        label.innerText = "† 事件記録 †";
        label.style.color = "#ff4d4d";
    } else {
        canvas.classList.remove('mode-reveal');
        canvas.classList.add('mode-normal');
        label.innerText = "† 関係図(表) †";
        label.style.color = "#fff";
    }
}