from django.db import models

#for å definere databasen 

#Favoritter 
class Favorites(models.Model):
    routeid = models.IntegerField(db_column='routeid')  # Field name made lowercase.
    usermail = models.TextField(db_column='usermail')  # Field name made lowercase.
    id = models.AutoField(db_column='id', primary_key=True)

    class Meta:
        managed = True
        db_table = 'Favorites'

#Ruter
class Routes(models.Model):
    slope = models.FloatField(db_column='Slope', blank=True, null=True)  
    surface = models.TextField(db_column='Surface', blank=True, null=True)
    length = models.FloatField(db_column='Length', blank=True, null=True)  
    polyline = models.CharField(db_column='Polyline', blank=True, null=True, max_length=2000)  
    startpoint = models.TextField(db_column='StartPoint')  
    endpoint = models.TextField(db_column='EndPoint') 
    id = models.IntegerField(primary_key=True)
    name = models.TextField(db_column='Name', blank=True, null=True) 

    class Meta:
        managed = False
        db_table = 'Routes'


#Brukere
class User(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)
    name = models.TextField()
    email = models.TextField()
    password = models.TextField()

    class Meta:
        managed = True  
        db_table = 'User'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Layer(models.Model):
    topology = models.OneToOneField('Topology', models.DO_NOTHING, primary_key=True)  # The composite primary key (topology_id, layer_id) found, that is not supported. The first column is selected.
    layer_id = models.IntegerField()
    schema_name = models.CharField(max_length=2000)
    table_name = models.CharField(max_length=2000)
    feature_column = models.CharField(max_length=2000)
    feature_type = models.IntegerField()
    level = models.IntegerField()
    child_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'layer'
        unique_together = (('topology', 'layer_id'), ('schema_name', 'table_name', 'feature_column'),)


class MyapiActivity(models.Model):
    id = models.BigAutoField(primary_key=True)
    strava_id = models.BigIntegerField(unique=True)
    name = models.CharField(max_length=255)
    activity_type = models.CharField(max_length=50)
    start_date = models.DateTimeField()
    duration = models.IntegerField()
    distance = models.FloatField()
    achievement_count = models.IntegerField()
    athlete_count = models.IntegerField()
    average_speed = models.FloatField(blank=True, null=True)
    comment_count = models.IntegerField()
    commute = models.BooleanField()
    elev_high = models.FloatField()
    elev_low = models.FloatField()
    end_latlng = models.CharField(max_length=255, blank=True, null=True)
    external_id = models.CharField(max_length=255, blank=True, null=True)
    flagged = models.BooleanField()
    gear_id = models.CharField(max_length=100, blank=True, null=True)
    has_heartrate = models.BooleanField()
    kudos_count = models.IntegerField()
    manual = models.BooleanField()
    max_speed = models.FloatField()
    moving_time = models.IntegerField()
    photo_count = models.IntegerField()
    private = models.BooleanField()
    start_date_local = models.DateTimeField()
    start_latlng = models.CharField(max_length=255, blank=True, null=True)
    timezone = models.CharField(max_length=100)
    total_elevation_gain = models.FloatField()
    trainer = models.BooleanField()
    visibility = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'myapi_activity'


class SpatialRefSys(models.Model):
    srid = models.IntegerField(primary_key=True)
    auth_name = models.CharField(max_length=256, blank=True, null=True)
    auth_srid = models.IntegerField(blank=True, null=True)
    srtext = models.CharField(max_length=2048, blank=True, null=True)
    proj4text = models.CharField(max_length=2048, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spatial_ref_sys'


class Topology(models.Model):
    name = models.CharField(unique=True, max_length=2000)
    srid = models.IntegerField()
    precision = models.FloatField()
    hasz = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'topology'


class Users(models.Model):
    name = models.CharField(max_length=150, blank=True, null=True)
    username = models.CharField(max_length=100, blank=True, null=True)
    password = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
