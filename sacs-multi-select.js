/**
     * `sacs-multi-select`
     * select, delete and view  multiple items
     *
     * @customElement
     * @polymer
     * @demo demo/index.html
     */

'use strict';

Polymer({
    is: 'sacs-multi-select',
    properties: {

        datafilter: {
            type: Array,
            value:
                [
                    { name: "Item 1", id: "1" },
                    { name: "Item 2", id: "2" },
                    { name: "Item 3", id: "3" },
                    { name: "Item 4", id: "4" },
                    { name: "Item 5", id: "5" },
                    { name: "Item 6", id: "6" },
                    { name: "Item 7", id: "7" },
                    { name: "Item 8", id: "8" },
                    { name: "Item 9", id: "9" },
                    { name: "Item 10", id: "10" },
                ]
        },

        title: {
            type: String,
            value: 'Title'
        },

        description: {
            type: String,
            value: 'Description'
        },

        placeholderinput:{
            type:String,
            value:"placeholder"
        }
    },

    listeners: {
        'item-selected': '_listenerSelectItem',
        'container_items.click': '_listenerCointainerItems'
    },


    _listenerSelectItem: function (e) {

        this.$$('sacs-list-dropdown')._closeList();
        this.$.input_filter.value = "";

        const templateItem = `
        <div style=" min-width: 90px;
        min-height: 30px;
        padding: 5px;
        margin: 10px;
        background: rgb(158, 239, 245);
        box-sizing: border-box;
        display:flex;
        align-items:center;
        justify-content:center;
        border: 1px solid gray;
        border-radius: 15px;">
          <span>${e.detail.name}</span>
           <iron-icon class="icon_close" icon="icons:clear" data-id="${e.detail.itemSelected}"></iron-icon>
         </div>`;

        if (e.detail.name !== null) {
            this.$$('.container_items').insertAdjacentHTML('beforeend', templateItem);
        }

        this.$$('sacs-list-dropdown').dataList = this.datafilter;
    },

    _listenerCointainerItems: function (e) {
        if (e.target.getAttribute('data-id') !== null) {
            this.$$('.container_items').removeChild(e.target.parentElement);
        }
    },

    _filterSearch: function (e) {
        const txtToFilter = this.$.input_filter.value.toLowerCase();
        this.$$('sacs-list-dropdown')._openList();


        if (this.__notOnlySpaces(txtToFilter)) {
            const dataAux = this.datafilter;
            const dataFiltered = dataAux.filter(element => element.name.toLowerCase().includes(txtToFilter));

            if (dataFiltered.length === 0) {
                this.$$('sacs-list-dropdown')._closeList();
            }

            this.$$('sacs-list-dropdown').dataList = dataFiltered;

        } else {
            this.$$('sacs-list-dropdown').dataList = this.datafilter;
        }

    },

    __notOnlySpaces: function (text) {
        const regex = new RegExp(/[a-z0-9]/);
        return regex.test(text);
    }


});