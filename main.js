var totalItems=0;

function updateItemStatus()
{
    var chId = this.id.replace('cb_', '');//id를 받아서 cd_를 뗀다
    var itemText = document.getElementById('item_'+chId);

    if(this.checked)
    {
        itemText.className='checked';
    }
    else
    {
        itemText.className='';
    }
}

function deleteThis()
{
    var chId=this.id.replace('db_','');
    var deleteElement = document.getElementById('li_'+chId);
    var list=document.getElementById('todolist');
    list.removeChild(deleteElement);
}

function addNewItem(list, itemText,dDayTime)
{
    totalItems++;
    var listItem = document.createElement('li');
    var checkBox = document.createElement('input');
    var deleteButton = document.createElement('input');
    var deadLine = document.createElement('span');

    listItem.id='li_'+totalItems;

    checkBox.type='checkbox';
    checkBox.id='cb_'+totalItems;
    checkBox.onclick = updateItemStatus;

    var span = document.createElement('span');
    span.id = 'item_' +totalItems;
    span.innerText = itemText;

    deleteButton.type='button';
    deleteButton.id='db_'+totalItems;
    deleteButton.onclick = deleteThis;

    deadLine.id='dl_'+dDayTime;

    listItem.appendChild(deleteButton);
    listItem.appendChild(checkBox);
    listItem.appendChild(span);
    listItem.appendChild(deadLine);
    list.appendChild(listItem);
}

var dDay=document.getElementById('dDay');
var inputText=document.getElementById('inputText');
inputText.focus();

inputText.onkeyup=function(event)
{
    if(event.which === 13)
    {
        var dDayTime = dDay.value;
        var itemText = inputText.value;
        inputText.value = '';
        dDay.value = '';
        if(!itemText) return false;
        addNewItem(document.getElementById('todolist'),itemText,dDayTime);
        inputText.focus;
        inputText.select;
    }
};
