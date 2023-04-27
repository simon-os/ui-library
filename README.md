##Components:
Additional info for each component can be found in JSDoc, at the beginning of the <br />
corresponding file, or by hovering the mouse over the function call. 

### All components have these events: 
**onInit**(instance) <br />
**onDestroy**(instance) <br />
**onOpen**(instance, target) <br />
**onClose**(instance, target) <br />

###Specific events:
Select: **onSelect**(instance, target) <br />
Tabs: **onSwitch**(instance, target)

##Animations
If parameters are not specified in options, these defaults will be used: <br />

**duration**: 1 <br />
**ease**: 'Power3.easeInOut' <br />
**stagger**: 0.12 <br />
**start**: '0 65%' <br />
**toggleActions**: 'play none none none' <br />
**animateOpacity**: true 