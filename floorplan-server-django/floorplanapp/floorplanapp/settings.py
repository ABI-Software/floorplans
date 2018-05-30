"""
settings.py - Import the relevant settings depending on what environment we're in.
"""
import os

# We check if we should launch in prod or debug mode
if 'FLOORPLANAPP_ENV' in os.environ and os.environ['FLOORPLANAPP_ENV'] == 'prod':
	from .settings_deploy import *
	try:
		from .secrets import *
	except ImportError:
		pass
else:
	from .settings_local import *
