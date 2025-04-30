import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.support.ui import WebDriverWait


class E2ETests(unittest.TestCase):
    expected_about_title = 'Welcome!'
    about_heading_title = 'about-heading-title'
    input_text_id = 'input-text'

    TIMEOUT = 10

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:4200")

    def tearDown(self):
        self.driver.quit()

    def test_browser_title_contains_app_name(self):
        self.assertIn("Pumi App", self.driver.title)

    def test_about_title(self):
        heading = self.find_text_by_id('about-title')
        self.assertEqual(self.expected_about_title, heading)

    def test_about_name_by_test_id(self):
        heading = self.find_by_data_test_id(self.about_heading_title, "h2")
        self.assertEqual(self.expected_about_title, heading)

    def test_about_name_by_test_id_css(self):
        heading = self.find_text_by_data_test_id_css('h2', self.about_heading_title)
        self.assertEqual(self.expected_about_title, heading)

    def test_about_has_button(self):
        button = self.find_text_by_data_test_id_css('button', 'button-welcome')
        self.assertIsNotNone(button)

    def test_index_has_form(self):
        button = self.find_element_by_data_test_id_css('button', 'button-welcome')
        button.click()
        form_sign_in = self.find_element_by_data_test_id_css('form', 'form-sign-in')
        self.assertIsNotNone(form_sign_in)
        self.assertIsNotNone(button)

    def test_sign_in_form(self):
        button = self.find_element_by_data_test_id_css('button', 'button-about')
        button.click()

        sign_in_email = self.find_element_by_id_css('input', 'componentEmail')
        sign_in_email.send_keys('user@user.ro')
        sign_in_password = self.find_element_by_id_css('input', 'componentPass')
        sign_in_password.send_keys('user234*')
        button = self.find_element_by_id_css('button', 'login-submit')
        button.click()

        about_heading = self.find_element_by_css('h2')
        self.assertEqual(about_heading.text, 'About')

        # button = self.find_element_by_data_test_id_css('button', 'button-about')
        # button.click()

        link = self.find_element_by_css('h1')
        link.click()

        home_heading = self.find_element_by_id_css('h2', 'home-heading')
        self.assertEqual(home_heading.text, 'Session in progress')

        link = self.find_element_by_id('user-click')
        link.click()

    def find_element_by_css(self, tag):
        return WebDriverWait(self.driver, self.TIMEOUT).until(ec.visibility_of_element_located((By.CSS_SELECTOR, tag)))

    def find_element_by_id(self, element_id):
        return WebDriverWait(self.driver, self.TIMEOUT).until(ec.visibility_of_element_located((By.ID, element_id)))

    def find_element_by_id_css(self, tag, value):
        return WebDriverWait(self.driver, self.TIMEOUT).until(ec.visibility_of_element_located(
            (By.CSS_SELECTOR, tag + "[id='" + value + "']")))

    def find_element_by_data_test_id_css(self, tag, value):
        return WebDriverWait(self.driver, self.TIMEOUT).until(ec.visibility_of_element_located(
            (By.CSS_SELECTOR, tag + "[data-test-id='" + value + "']")))

    def find_text_by_data_test_id_css(self, tag, value):
        return self.find_element_by_data_test_id_css(tag, value).text

    def find_by_data_test_id(self, value, tag):
        return WebDriverWait(self.driver, self.TIMEOUT).until(
            ec.visibility_of_element_located((By.XPATH, "//" + tag + "[@data-test-id='" + value + "']"))).text

    def find_text_by_id(self, value):
        return self.driver.find_element(By.ID, value).text
