from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^user/register/$', views.Register, name='Register'),
    url(r'^user/additional/profile/$', views.additional_info, name='additional_info'),
    url(r'^user/logout/$', views.student_logout, name='student_logout'),
    url(r'^user/profile/get/$', views.Profile, name='profile'),
    url(r'^user/profile/edit/$', views.edit_profile, name='edit_profile'),
    url(r'^plans/get/$', views.get_plans, name='get_plans'),
    url(r'^user/wash/history/$', views.wash_history, name='wash_history'),
    url(r'^user/wash/track/$', views.track_status, name='track_status'),
    url(r'^laundromat/signin/$', views.signin_laundro, name='signin_laundro'),
    url(r'^laundromat/scan/$', views.scan_laundro, name='scan_laundro'),
    url(r'^laundromat/status/change/$', views.change_status, name='change_status'),
    url(r'^laundromat/hostel/students/$', views.get_students, name='get_students'),
    url(r'^laundromat/get/student/$', views.get_student_info, name='get_student_info'),
    url(r'^laundromat/hostels/get/$', views.get_hostels, name='get_hostels'),
    url(r'^laundromat/notification/$', views.push_notif, name='push_notif'),
    url(r'^laundromat/sheet/$', views.student_data, name='student_data'),
    url(r'^app_version/$', views.get_app_version, name='get_app_version'),
]