# Logistics 1
![Logistics1 image](/Logistics1-image.png)
## Description
This is a logistics assistance project I developed for my brother. He is an engineer working for a logistics company in Spain.

He needed aid dealing with a large number of messy products. His target is to place each product into its correct destination according to the data he is provided about each one of them (product code, quantity and destination).

So what he needs is to take a messy product, to check for its code, and to have an easy and fast way to find it over the data so that he knows where to place it.

Finally, he wanted the program to count the already handled products, and to tell when a product is finished.
## How to use it
1. The trickiest part is at the very beginning, when you have to input the data you are going to be working with. Once you surpass this step, it becomes all super intuitive. It is not the best way to do it for sure, but it was part of the challenge and fun to see it working.
   1. You need to input text in the *dialog box*, but that text must be in a specific format for the program to work:
      - Firstly, it must be in **JSON format**.
      - Secondly, it must contain the appropriate data with the **appropriate keys** for each product ("Product Code", "Quantity", "Placed", "Not Placed", "Destination List").
      
      Here is an example containing data for two products:
      ```
        [
         {
          "Product Code": "ASD654",
          "Quantity": 4,
          "Placed": null,
          "Not Placed": null,
          "Destination List": "List 1"
         },
         {
          "Product Code": "AS3D2G",
          "Quantity": 6,
          "Placed": null,
          "Not Placed": null,
          "Destination List": "List 5"
         }
        ]
      ```
      I have also included a `.txt` file called `"InitialDataJsonExample.txt"` in the repository, which contains data for many products in the appropriate JSON format (you can copy-paste it all exactly as it is into the dialog box); and an `.xlsx` file called `"InitialDataExcelExample.xlsx"` to show where the data come from in a table format.

   2. Hit the Ok button.
   
2. The products and their values are arranged into a table for the user to have a comfortable view of them.
3. From the search box, you can select a product to work with and to see its values.
4. Use the buttons to count the products or to print the table.

*You can see the program uploaded as a website **[here](https://tinf9.github.io/Logistics1/)**.*

**Thank you very much for checking it out.**
