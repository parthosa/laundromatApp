from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^users/register/$', views.Register, name='Register'),
    url(r'^user/additional/profile/$', views.additional_info, name='additional_info'),
    url(r'^user/logout/$', views.logout, name='logout'),
    url(r'^user/profile/get/$', views.Profile, name='profile'),
    url(r'^user/profile/edit/$', views.edit_profile, name='edit_profile'),
    url(r'^laundromat/wash/$', views.wash_history, name='wash_history'),
    url(r'^laundromat/scan/$', views.scan_laundro, name='scan_laundro'),
    url(r'^laundromat/status/change/$', views.change_status, name='change_status'),
    url(r'^laundromat/hostel/students/$', views.get_students, name='get_students'),
    url(r'^laundromat/hostels/get/$', views.get_hostels, name='get_hostels'),
]