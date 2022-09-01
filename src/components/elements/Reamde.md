# HFComponents
This ```readme``` file will guide you to how to use ```HFComponents``` in any project.

#### How to use it in differnt components?
first import the required component where you want.
Like if you want to import ```HfButtons.vue``` component in ```App.vue``` then in App.vue in script tag import HfButtons component
now register HfButtons in App.vue

Now in App.vue in ```template``` seaction or anywhere in ```html``` section you simply write like ```<hf-buttons></hf-buttons>```

## HfButtons
```HfButtons.vue``` is a reusable button component.

You need to pass ```name``` of the button as ```prop``` which is required prop.

You can also pass ```iconClass```,  ```customClass```, ```title``` as ```props``` if required.

In ```HfButtons.vue``` event is emmited as ```executeAction``` when button gets clicked. You can listen this emit event where you have imported 
HfButtons.

ex: if you have imported it in App.vue then it works like this
```<hf-buttons @executeAction="methodname"></>```

## HfNotes
```HfNotes``` is reusable componet basically used to show some ```note```.

In ```Hfnotes``` you can send ```notes``` as prop from parent component

```<hf-notes :notes="variable name which contains note"></hf-notes>```

```NOTE```: You can also send ```raw-html``` in ```notes``` as prop


## HfPageMessage
```HfPageMessage.vue``` is a reusable component used to show some heading page messages in page.
like ```HfNotes``` you can send ```message``` as a prop and it could be ```raw-html``` also.

ex: ```<hf-page-message :message="variable name which contains message"></hf-page-message>```
