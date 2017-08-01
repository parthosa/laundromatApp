from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	bits_id = models.CharField(max_length = 20, null = True,unique = True)
	name = models.CharField(max_length = 20, null = True)
	room = models.IntegerField(null = True)
	hostel = models.ForeignKey('Hostel', null = True, related_name  = 'stu_hostel')
	plan = models.ForeignKey('Plan' ,null= True, blank=True,related_name = 'stu_plan')
	apply_date = models.CharField(max_length = 30, blank=True,null = True)
	phone = models.CharField(max_length = 20,null = True)
	present_wash = models.ForeignKey('Wash', null = True, related_name = 'stu_wash')
	wash_history = models.ManyToManyField('Wash', related_name = 'stu_wash_history')
	uid = models.CharField(max_length = 60, null = True)
	user = models.ForeignKey(User, null = True)
	bag_num = models.CharField(max_length = 40, null = True)
	# dp = models.ImageField(upload_to = 'dps', null = True)
	dp_url = models.CharField(max_length = 150,null = True)
	num_washes = models.IntegerField(null = True)
	device_id = models.ManyToManyField('Device_ID', related_name = 'user_devices')
	total_washes = models.IntegerField(null = True)

	def __unicode__(self):
		return self.name

	# def save(self, *args, **kwargs):
	# 	if self.dp:
	# 		self.dp_url = self.dp.url
	# 	else:
	# 		pass
	# 	super(UserProfile, self).save(*args, **kwargs)

class Plan(models.Model):
	plan_num = models.IntegerField(null = True)
	washes = models.IntegerField(null = True)
	with_iron = models.BooleanField(default = False)

	def __unicode__(self):
		return str(self.plan_num)

class Device_ID(models.Model):
	device_id = models.CharField(max_length = 200)
	user = models.ForeignKey('UserProfile', related_name = 'device_user')

	def __unicode__(self):
		return self.user.name + '_' + self.device_id

class Status(models.Model):
	name = models.CharField(max_length= 50, null = True)
	number = models.IntegerField(null = True)

	def __unicode__(self):
		return self.name

class Hostel(models.Model):
	name = models.CharField(max_length = 50, null = True)
	short = models.CharField(max_length = 6, null = True)
	user = models.ManyToManyField('UserProfile', blank=True, null = True, related_name = 'hostel_stu')

	def __unicode__(self):
		return self.name

class Wash(models.Model):
	user = models.ForeignKey(UserProfile, null = True, related_name = 'wash_use')
	number = models.IntegerField(default = 1)
	status = models.ForeignKey(Status, null = True, related_name = 'status_user')
	date = models.CharField(max_length = 100 ,null = True)

	def __unicode__(self):
		return self.user.name

