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
            value:[]
        },

        data:{
            type:Array,
            value:[]
        },

        items:{
            type:Object,
            value:{}
        },

        title: {
            type: String,
            value: 'Title'
        },

        description: {
            type: String,
            value: 'Description'
        },

        placeholderinput: {
            type: String,
            value: "placeholder"
        },
        dataselected: {
            type: Array,
            value: []
        }
    },

    listeners: {
        'item-selected': '_listenerSelectItem',
        'container_items.click': '_listenerCointainerItems'
    },

    attached: function () {
        this.data.map( obj => {

            const dataList = new Object();
            for (let key in obj){
                if(key === this.items.label){
                  dataList.name = obj[key];
                }
                
                if(key === this.items.id){
                    dataList.id = obj[key];

                }
              
            }

            this.push('datafilter', dataList);
        });
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

        this.push('dataselected', { id: e.detail.itemSelected, name: e.detail.name });


        if (e.detail.name !== null) {
            this.$$('.container_items').insertAdjacentHTML('beforeend', templateItem);
        }

        this.$$('sacs-list-dropdown').dataList = this.datafilter;
    },

    _listenerCointainerItems: function (e) {
        const idItem = e.target.getAttribute('data-id');
        if (idItem !== null) {
            const newArray = this.dataselected.filter(item => item.id !== idItem);

            this.dataselected = newArray;

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