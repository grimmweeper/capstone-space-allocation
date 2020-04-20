package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;;

public class InvalidSignup {

    static String userName = "tom";
    static String passWord = "abcdef";
    static String email = "fakeemail";
    static String type = "wrongtype";

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/signup");
        Thread.sleep(2000);
        WebElement username = driver.findElement(By.id("username"));
        Thread.sleep(2000);
        username.sendKeys(userName);

        WebElement password = driver.findElement(By.id("password"));
        Thread.sleep(2000);
        password.sendKeys(passWord);

        WebElement emailField = driver.findElement(By.id("email"));
        Thread.sleep(2000);
        emailField.sendKeys(email);

        WebElement submitButton = driver.findElement(By.id("submitBtn"));
        submitButton.click();
    }
}
