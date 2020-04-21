package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class UploadFeatureFuzzing {

    static String username = "liying";
    static String password = "liying";

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","C:\\Code\\web_drivers\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/home");
        Thread.sleep(4000);

        // Login to access other components
        WebElement usernameField = driver.findElement(By.name("username"));
        Thread.sleep(2000);
        usernameField.sendKeys(username);

        WebElement passwordField = driver.findElement(By.name("password"));
        Thread.sleep(2000);
        passwordField.sendKeys(password);

        WebElement loginButton = driver.findElement(By.name("login"));
        loginButton.click();
        Thread.sleep(2000);

        driver.switchTo().alert().accept();
        Thread.sleep(2000);

        // Upload error csv file
        WebElement button = driver.findElement(By.name("uploadPage"));
        button.click();
        Thread.sleep(2000);

        WebElement uploadElement = driver.findElement(By.className("csv-input"));
        //uploadElement.sendKeys("D:\\Projects\\react\\space-allocation\\errorcsv.csv");
        uploadElement.sendKeys("C:\\Code\\ESC\\capstone-space-allocation\\fuzzingcsv.csv");
        Thread.sleep(4000);

        WebElement uploadButton = driver.findElement(By.id("uploadBtn"));
        uploadButton.click();
    }
}
