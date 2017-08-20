from django.contrib import admin
from .models import *

class UserProfileAdmin(admin.ModelAdmin):
	search_fields = ['name']

admin.site.register(UserProfile,UserProfileAdmin)
admin.site.register(Plan)
admin.site.register(Status)
admin.site.register(Hostel)
admin.site.register(Wash)
admin.site.register(Device_ID)
admin.site.register(App_version)
