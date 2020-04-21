package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;;

public class FailedUpload {

    static String username = "david";
    static String password = "123456";
    static String email = "david@gmail.com";
    static String type = "admin";

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","C:\\Code\\web_drivers\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/home");
        Thread.sleep(4000);

        // Register an account
        WebElement registerButton1 = driver.findElement(By.name("register"));
        Thread.sleep(2000);
        registerButton1.click();

        WebElement usernameField = driver.findElement(By.name("username"));
        Thread.sleep(2000);
        usernameField.sendKeys(username);

        WebElement passwordField = driver.findElement(By.name("password"));
        Thread.sleep(2000);
        passwordField.sendKeys(password);

        WebElement emailField = driver.findElement(By.name("email"));
        Thread.sleep(2000);
        emailField.sendKeys(email);

        Select typeField = new Select(driver.findElement(By.name("type")));
        Thread.sleep(2000);
        typeField.selectByValue(type);

        WebElement registerButton2 = driver.findElement(By.name("register"));
        registerButton2.click();
        Thread.sleep(2000);

        driver.switchTo().alert().accept();
        Thread.sleep(2000);

        // Login to access other components
        usernameField = driver.findElement(By.name("username"));
        Thread.sleep(2000);
        usernameField.sendKeys(username);

        passwordField = driver.findElement(By.name("password"));
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
