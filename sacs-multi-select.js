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
                value:[],
                observer:'_observerData'
            },
    
            placeholderinput: {
                type: String,
                value: "placeholder"
            },
            result: {
                type: Array,
                value: [],
                notify:true
            },
    
            labels:{
                type:String,
                value:null
            },
    
            keys:{
                type:String,
                value:null
            },
            value:{
                type:Object,
                value:{}
            }
        },
    
        listeners: {
            'item-selected': '_listenerSelectItem',
            'container_items.click': '_listenerCointainerItems'
        },
    
        _observerData: function(newVal, old){
    
              this.debounce('action', () => {
                this.data.map( obj => {
                    //console.log("OBJ", obj)

                  let dataList = new Object();

                  for (let key in obj){
                      if(key === this.labels){
                        dataList.name = obj[key];
                      }
                      
                      if(key === this.keys){
                          dataList.id = obj[key];
                      }

                      if(key === "type"){
                          dataList.type = obj[key]
                      }
                    
                  }

                  this.push('datafilter', dataList);
              });
    
    
            }, 2000);
             
        },
    
        _listenerSelectItem: function (e) {
    
            this.$$('sacs-list-dropdown')._closeList();
            this.$.input_filter.value = "";
    
            const templateItem = `
            <div style=" min-width: 90px;
            min-height: 30px;
            padding: 5px;
            margin: 10px;
            background: rgba(12, 229, 245, 0.2);
            box-sizing: border-box;
            display:flex;
            align-items:center;
            justify-content:center;
            border: 1px solid gray;
            border-radius: 15px;">
              <span>${e.detail.name}</span>
               <iron-icon class="icon_close" icon="icons:clear" data-id="${e.detail.itemSelected}"></iron-icon>
             </div>`;
    
            this.push('result', { id: e.detail.itemSelected, name: e.detail.name, type:e.detail.type });
            //this.notifyPath('result');
            console.log("RESULT...", this.result);
            this.__createObjectValue({ id: e.detail.itemSelected, name: e.detail.name });
    
    
            if (e.detail.name !== null) {
                this.$$('.container_items').insertAdjacentHTML('beforeend', templateItem);
            }

    
            this.$$('sacs-list-dropdown').dataList = this.datafilter;
    
        },
    
        _listenerCointainerItems: function (e) {
            const idItem = e.target.getAttribute('data-id');
            if (idItem !== null) {
                const newArray = this.result.filter(item => item.id !== idItem);
    
                this.result = newArray;
    
                this.$$('.container_items').removeChild(e.target.parentElement);
            }
        },

        __createObjectValue: function(obj){

            try {
                Object.defineProperty(this.value, obj.id, 
                    { 
                     enumerable: true,
                     value:true 
                    }
                );
    
            } catch (err) {
                console.log("[Error al definir property]", err);
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