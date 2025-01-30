class HamsterKombat {
    constructor() {
        this.coinBalance = 0;
        this.tapPower = 1;
        this.upgrades = [
            { name: 'الطاقة', cost: 10, level: 0, multiplier: 1.5 },
            { name: 'السرعة', cost: 25, level: 0, multiplier: 2 },
            { name: 'القوة', cost: 50, level: 0, multiplier: 2.5 }
        ];
        this.initializeElements();
        this.initializePages();
        this.setupEventListeners();
        this.initializeQuestions();
    }
    initializeElements() {
        this.coinBalanceElement = document.getElementById('coinBalance');
        this.hamsterCharacter = document.getElementById('hamsterCharacter');
        this.tapButton = document.getElementById('tapButton');
        this.upgradesList = document.getElementById('upgradesList');
        this.renderUpgrades();
    }
    initializePages() {
        const navButtons = document.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetPage = button.dataset.page;
                this.switchToPage(targetPage);

                // Update active state of nav buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
        // Set initial active page and button
        this.switchToPage('tapPage');
        document.querySelector('[data-page="tapPage"]').classList.add('active');
    }
    setupEventListeners() {
        this.hamsterCharacter.addEventListener('click', () => this.tap());
        this.tapButton.addEventListener('click', () => this.tap());
    }
    switchToPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }
    tap() {
        this.coinBalance += this.tapPower;
        this.updateCoinBalance();
        this.animateTap();
    }
    animateTap() {
        this.hamsterCharacter.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.hamsterCharacter.style.transform = 'scale(1)';
        }, 100);
    }
    updateCoinBalance() {
        this.coinBalanceElement.textContent = this.coinBalance;
    }
    renderUpgrades() {
        this.upgradesList.innerHTML = this.upgrades.map(upgrade => `
            <div class="upgrade-item" data-name="${upgrade.name}">
                <h4>${upgrade.name}</h4>
                <p>المستوى: ${upgrade.level}</p>
                <p>التكلفة: ${upgrade.cost}</p>
                <button onclick="game.purchaseUpgrade('${upgrade.name}')">ترقية</button>
            </div>
        `).join('');
    }
    purchaseUpgrade(upgradeName) {
        const upgrade = this.upgrades.find(u => u.name === upgradeName);

        if (this.coinBalance >= upgrade.cost) {
            this.coinBalance -= upgrade.cost;
            upgrade.level++;
            upgrade.cost = Math.floor(upgrade.cost * upgrade.multiplier);
            this.tapPower += 1;

            this.updateCoinBalance();
            this.renderUpgrades();
        } else {
            alert('لا يوجد عملات كافية!');
        }
    }
    initializeQuestions() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and categories
                categoryTabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.question-category').forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding category
                tab.classList.add('active');
                const category = tab.dataset.category;
                document.querySelectorAll(`.${category}`).forEach(c => c.classList.add('active'));
            });
        });
    }
}

const game = new HamsterKombat();
