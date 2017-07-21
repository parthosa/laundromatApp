from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	bits_id = models.CharField(max_length = 20, null = True)
	name = models.CharField(max_length = 20, null = True)
	room = models.IntegerField(null = True)
	hostel = models.ForeignKey('Hostel', null = True, related_name  = 'stu_hostel')
	plan = models.ForeignKey('Plan' ,null= True, related_name = 'stu_plan')
	apply_date = models.CharField(max_length = 30, null = True)
	phone = models.IntegerField(null = True)
	present_wash = models.ForeignKey('Wash', null = True, related_name = 'stu_wash')
	wash_history = models.ManyToManyField('Wash', related_name = 'stu_wash_history')
	uid = models.CharField(max_length = 60, null = True)
	user = models.ForeignKey(User, null = True, related_name = 'user_p')
	dp = models.ImageField(upload_to = 'dps', null = True)
	dp_url = models.SlugField(null = True)

	def __unicode__(self):
		return self.name

	def save(self, *args, **kwargs):
		if self.dp:
			self.dp_url = self.dp.url
		else:
			pass
		super(UserProfile, self).save(*args, **kwargs)

class Plan(models.Model):
	plan_num = models.IntegerField(null = True)
	washes = models.IntegerField(null = True)
	with_iron = models.BooleanField(default = False)

	def __unicode__(self):
		return self.plan_num

class Status(models.Model):
	name = models.CharField(max_length= 50, null = True)
	number = models.IntegerField(null = True)

	def __unicode__(self):
		return self.name

class Hostel(models.Model):
	name = models.CharField(max_length = 50, null = True)
	short = models.CharField(max_length = 4, null = True)
	user = models.ManyToManyField('UserProfile', null = True, related_name = 'hostel_stu')

	def __unicode__(self):
		return self.name

class Wash(models.Model):
	user = models.ForeignKey(UserProfile, null = True, related_name = 'wash_use')
	status = models.ForeignKey(Status, null = True, related_name = 'status_user')
	date = models.CharField(max_length = 100 ,null = True)

	def __unicode__(self):
		return self.user.name

