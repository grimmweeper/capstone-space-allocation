package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class SignupInjectionUsername {

    static String usernameInjection = "anything') DROP TABLE escdummy;--'); ";
    static String anyPassword = "anything";
    static String anyEmail = "anything@gmail.com";
    static String anyType = "admin";

    public static void main(String[] args) throws InterruptedException {

        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","C:\\Code\\web_drivers\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000");
        Thread.sleep(2000);

        WebElement registerButton1 = driver.findElement(By.name("register"));
        Thread.sleep(2000);
        registerButton1.click();

        // Try to drop table by injecting username
        WebElement usernameField = driver.findElement(By.name("username"));
        Thread.sleep(2000);
        usernameField.sendKeys(usernameInjection);

        WebElement passwordField = driver.findElement(By.name("password"));
        Thread.sleep(2000);
        passwordField.sendKeys(anyPassword);

        WebElement emailField = driver.findElement(By.name("email"));
        Thread.sleep(2000);
        emailField.sendKeys(anyEmail);

        Select typeField = new Select(driver.findElement(By.name("type")));
        Thread.sleep(2000);
        typeField.selectByValue(anyType);

        WebElement registerButton2 = driver.findElement(By.name("register"));
        registerButton2.click();
        Thread.sleep(2000);
    }

}
