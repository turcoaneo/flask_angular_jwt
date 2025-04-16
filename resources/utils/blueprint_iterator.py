import importlib
import os
from pathlib import Path

from flask_smorest import Blueprint


def identify_blueprints(package_name='resources.api') -> list[Blueprint]:
    """Identify all Blueprint instances found in the modules of the given package."""
    result = list()
    package_path_str = package_name.replace('.', os.path.sep)
    package_path = Path(package_path_str)
    if not package_path.is_dir():
        print(f"Warning: Package directory '{package_path}' not found.")
        return result

    for item in package_path.iterdir():
        if item.is_file() and item.suffix == '.py' and item.stem != '__init__':
            module_name = f"{package_name}.{item.stem}"
            try:
                module = importlib.import_module(module_name)
                for attr_name in dir(module):
                    attr = getattr(module, attr_name)
                    if isinstance(attr, Blueprint):
                        result.append(attr)
            except ImportError as e:
                print(f"Error importing module '{module_name}': {e}")
            except Exception as e:
                print(f"An error occurred while processing module '{module_name}': {e}")
    return result
