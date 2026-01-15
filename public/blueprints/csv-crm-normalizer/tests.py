import unittest
import pandas as pd
from clean_data import normalize_phone, process_dataframe

class TestCRMNormalizer(unittest.TestCase):

    def test_normalize_phone_us(self):
        """Test standard US phone normalization."""
        self.assertEqual(normalize_phone("555-0199", "+1"), "+15550199")
        self.assertEqual(normalize_phone("(555) 012-3456", "+1"), "+15550123456")

    def test_normalize_phone_existing_code(self):
        """Test handling of existing country codes."""
        self.assertEqual(normalize_phone("1-555-0199", "+1"), "+15550199")

    def test_dataframe_processing(self):
        """Test the full dataframe logic."""
        data = {
            "Name": ["JOHN DOE"],
            "Email": [" JOHN@TEST.COM "],
            "Phone": ["555-0199"]
        }
        df = pd.DataFrame(data)
        
        config = {
            "columns": {"name": "Name", "email": "Email", "phone": "Phone"},
            "settings": {
                "format_names_title_case": True,
                "email_lowercase": True,
                "default_country_code": "+1"
            }
        }
        
        df_clean = process_dataframe(df, config)
        
        self.assertEqual(df_clean.iloc[0]["Name"], "John Doe")
        self.assertEqual(df_clean.iloc[0]["Email"], "john@test.com")
        self.assertEqual(df_clean.iloc[0]["Phone"], "+15550199")

if __name__ == '__main__':
    unittest.main()