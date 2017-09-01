function DropdownMenu() {
    var self = this;
    if (!(this instanceof DropdownMenu)) return new DropdownMenu();
    
    self.activeDropdown = {};
    self.dropdownButtons = {};
    self.tail = '-dropDown';
    
    // 이건 한번만 해주면 되는 일이라 여기로 빼 주었다.
    window.onclick = function (event) {
        if (!event.target.classList.contains('dd-button')) {
            self.activeDropdown.element.style.display = 'none';
        }
    };

}

DropdownMenu.prototype.makeDropdownButton = function (parentElement) {
    var self = this;
    if(parentElement.id === undefined) return;
    var button = self.setInitialElements(parentElement);
    self.dropdownButtons[parentElement.id] = button;
};

DropdownMenu.prototype.setInitialElements = function (parentElement) {
    var self = this;
    var label = document.createElement('label');
    label.className = 'dropdown';
    label.id = parentElement.id + self.tail;

    var div = document.createElement('div');
    div.className = 'dd-button';

    var ul = document.createElement('ul');
    ul.className = 'dd-menu';

    label.appendChild(div);
    label.appendChild(ul);
    parentElement.appendChild(label);
    self.setEventListener(label);
    
    return label
};

// 이건 내부에서만 사용 할 것이다.
DropdownMenu.prototype.setEventListener = function (element) {
    var self = this;
    if (!element.id.includes('-dropDown')) return;
    element.addEventListener('click', function (event) {
        // 다른 드롭 다운 버튼을 누르면 원래 열려 있던 것이 없어진다.

        if (self.activeDropdown.id && self.activeDropdown.id !== element.id) {
            self.activeDropdown.element.style.display = 'none';
        }
        
        self.activeDropdown.id = element.id;
        self.activeDropdown.element = element.children[1];
        element.children[1].style.display = 'block';
    });

};
// 예외처리
// newMenu가 string 배열로 들어 올 때도 체크
// 만약에 메뉴의 메뉴가 필요하다면 그것도 나중에 처리해주기
DropdownMenu.prototype.addMenu = function (parentId, newMenu, callback) {
    var self = this;
    // 현재 element의 dd-menu의 innerHTML에 <li> newMenuString </li>이런식으로 추가한다.
    var li = document.createElement('li');
    li.innerHTML = newMenu;
    if (callback) {
        li.addEventListener('click', callback);
    }
    // 파일 폴더에 버튼 1개씩 달 것 이고 파일 폴더는 유일하니까 id도 유일하다.
    self.dropdownButtons[parentId].children[1].appendChild(li);
};

module.exports = DropdownMenu;
