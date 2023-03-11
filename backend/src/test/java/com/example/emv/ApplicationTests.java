package com.example.emv;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.util.Assert;

class ApplicationTests {

	@Test
	void oneTest() {
		Assert.isTrue(true,"Was true");
	}

	@Test
	void secondTest() {
		Assert.isTrue(false == false,"Was false");
	}

}
