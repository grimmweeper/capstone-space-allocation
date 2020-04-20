package SoftCon;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;;

public class Signup {

    static String[] usernames = {"david", "wee ping"};
    static String[] passwords = {"123456", "password12345"};
    static String[] emails = {"david@gmail.com", "wee_ping@gmail.com"};
    static String[] types = {"admin", "user"};

    public static void main(String[] args) throws InterruptedException {


        //System.setProperty("webdriver.chrome.driver","D:\\Programs\\chromedriver.exe");
        System.setProperty("webdriver.chrome.driver","/C:/Code/web_drivers/chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:3000");
        Thread.sleep(2000);

        for (int i = 0; i < usernames.length; i++) {

            WebElement registerButton1 = driver.findElement(By.name("register"));
            Thread.sleep(2000);
            registerButton1.click();

            WebElement usernameField = driver.findElement(By.name("username"));
            Thread.sleep(2000);
            usernameField.sendKeys(usernames[i]);

            WebElement passwordField = driver.findElement(By.name("password"));
            Thread.sleep(2000);
            passwordField.sendKeys(passwords[i]);

            WebElement emailField = driver.findElement(By.name("email"));
            Thread.sleep(2000);
            emailField.sendKeys(emails[i]);

            Select typeField = new Select(driver.findElement(By.name("type")));
            Thread.sleep(2000);
            typeField.selectByValue(types[i]);

            WebElement registerButton2 = driver.findElement(By.name("register"));
            registerButton2.click();

        }
    }
}
