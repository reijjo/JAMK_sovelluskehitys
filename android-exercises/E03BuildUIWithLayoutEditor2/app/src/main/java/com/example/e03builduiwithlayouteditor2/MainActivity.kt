package com.example.e03builduiwithlayouteditor2

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView

class MainActivity : AppCompatActivity() {
    private val firstnames = arrayOf("Renato", "Rosangela", "Tim", "Bartol", "Jeannette")
    private val lastnames = arrayOf("Ksenia", "Metzli", "Asuncion", "Zemfina", "Giang")
    private val jobtitles = arrayOf("District Quality Coordinator","International Intranet Representative","District Intranet Administrator","Dynamic Research Manager","Central Infrastructure Consultant")


    // function displays employees data in UI
    private fun showEmployeeData(index: Int) {
        // find TextView's from the UI layout file
        val firstnameTextView = findViewById<TextView>(R.id.firstnameTextView)
        val lastnameTextView = findViewById<TextView>(R.id.lastnameTextView)
        val jobtitleTextView = findViewById<TextView>(R.id.jobtitleTextView)
        val employeeInfoTextView = findViewById<TextView>(R.id.employeeInfoTextView)
        // Update TextView texts
        firstnameTextView.text = firstnames[index];
        lastnameTextView.text = lastnames[index];
        jobtitleTextView.text = jobtitles[index];
        // info is
        employeeInfoTextView.text = getString(R.string.employee_info_text, lastnames[index], firstnames[index], getString(R.string.basic_text))

        // image
        var id = 0;
        when(index) {
            0 -> id = R.drawable.employee1
            1 -> id = R.drawable.employee2
            2 -> id = R.drawable.employee3
            3 -> id = R.drawable.employee4
            4 -> id = R.drawable.employee5
        }
        // find imageView and display correct employee image
        val imageView = findViewById<ImageView>(R.id.imageView)
        imageView.setImageResource(id)
    }



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // show first employee data
        showEmployeeData(0)
    }

    // function will be called from the UI
    fun numberClicked(view: View?) {
        // get clicked view as a textview and it text as a string
        val text = (view as TextView).text.toString()
        // modify string to int and decrease by one (array's start position 0)
        val int = text.toInt() - 1
        // show selected employee data in UI, call earlier made function
        showEmployeeData(int)
    }


}