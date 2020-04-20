package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;;

public class InvalidSignup {

    static String userName = "tom";
    static String passWord = "abcdef";
    static String cfmPassWord = "abcdef";
    static String telNum = "wrongNumber";
    static String email = "fakeemail";

    public static void main(String[] args) throws InterruptedException {


        System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000/signup");
        Thread.sleep(2000);
        WebElement username = driver.findElement(By.id("username"));
        Thread.sleep(2000);
        username.sendKeys(userName);

        WebElement password = driver.findElement(By.id("password"));
        Thread.sleep(2000);
        password.sendKeys(passWord);

        WebElement cfmpassword = driver.findElement(By.id("cfmpassword"));
        Thread.sleep(2000);
        cfmpassword.sendKeys(cfmPassWord);

        WebElement phone = driver.findElement(By.id("telnum"));
        Thread.sleep(2000);
        phone.sendKeys(telNum);

        WebElement emailField = driver.findElement(By.id("email"));
        Thread.sleep(2000);
        emailField.sendKeys(email);

        WebElement submitButton = driver.findElement(By.id("submitBtn"));
        submitButton.click();
    }
}
