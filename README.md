# \<sacs-multi-select\>

select, delete and view  multiple items

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.


# Properties

Name | Description | Default
-----|-------------|---------
`datafilter` | Estructura final con la que se pintara la lista | `[]`
`data` | JSON con la informacion que se transformara dependiendo `items` para pasar la estructura correcta a `datafilter` | `[]`
`items` | Objeto donde `label` e `id` sirven para validar con `data` las propiedades que tomaran valor para los elementos a mostrar   | `{}`
`title` | Titulo principal | `Title`
`description` | Parrafo para describir la lista | `Description`
`placeholderinput` | placeholder del input de filtrado | `placeholder`
`dataselected` | properties usada para guardar los items seleccionados | `[]`

## Use

```
<sacs-multi-select title="Productos" description="selecciona los productos que deseas" 
          items='{
            "label": "inventorycount", "id":"created"}' 
            data='[{
            "$key": "-L_Q-yOVCgn4DuKtoymp",
            "count": "ad",
            "created": 1552010176169,
            "inventorycount": "producto",
            "modified": 1552010176169,
            "outlet": "adasd",
            "startdate": "asda",
            "starttime": "adad",
            "status": "asdasd",
            "uid": "sYAz35uEWzgDIX19BneSCdWGoyj2",
            "manualCount":"manual count"
            },
            
            {
            "$key": "-L_Q0rKOQRAoWx2aC3UO",
            "count": "asdasd",
            "created": 1552010409385,
            "inventorycount": "viejo producto",
            "modified": 1552010409385,
            "outlet": "asdasd",
            "startdate": "asdads",
            "starttime": "asdasd",
            "status": "asdasd",
            "uid": "sYAz35uEWzgDIX19BneSCdWGoyj2",
            "manualCount":"manual count 2"
            },
            {
              "$key": "-L_Q0rKOQRAoWx2aC3UO",
              "count": "otro count",
              "created": 1552010409385,
              "inventorycount": "ultimo producto",
              "modified": 8422010407352,
              "outlet": "asdasd",
              "startdate": "asdads",
              "starttime": "asdasd",
              "status": "asdasd",
              "uid": "sYAz35uEWzgDIX19BneSCdWGoyj2",
              "manualCount":"manual count 3"
              }
            ]'></sacs-multi-select>
```

### Behaviour

El componente dado el ejemplo tomara la propiedad `inventorycount` y `created` para crear el objeto final de la siguiente forma:

```
   [   
    {label: producto, id:1552010176169},
    {label: viejo producto, id:1552010409385},
    {label: ultimo producto, id:8422010407352}
    ]
```


De esta forma al pasar `data` como el JSON y `items` como las propiedades que deben ser tomadas para crear la lista, hace que el componente sea configurable a cualquier propiedad del objeto `data`.