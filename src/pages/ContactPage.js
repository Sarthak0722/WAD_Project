import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Navbar from '../components/Navbar';
import bannerImage from '../assets/images/Banner.jpg';

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        {/* About Us Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              mb: 2
            }}
          >
            About us
          </Typography>
        </Box>

        {/* Hero Banner */}
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            mb: 6,
            bgcolor: '#b2ebf2'
          }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 6 },
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'cursive',
                  fontWeight: 'bold',
                  mb: 2
                }}
              >
                Rishikesh Milk Products
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'cursive',
                  fontSize: '1.2rem',
                  mb: 2,
                  color: 'text.secondary'
                }}
              >
                Serving quality since 2004
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'cursive',
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
              >
                We take pride in delivering the freshest dairy products directly from our farms to your doorstep.
                Our commitment to quality and customer satisfaction has made us a trusted name in the dairy industry.
              </Typography>
            </Box>
            <Box
              component="img"
              src={bannerImage}
              alt="Farm"
              sx={{
                width: { xs: '100%', md: '50%' },
                height: 'auto',
                borderRadius: '16px'
              }}
            />
          </Box>
        </Paper>

        {/* Track Location Section */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center'
          }}
        >
          Track our locations
        </Typography>
        <Paper
          elevation={3}
          sx={{
            borderRadius: '16px',
            overflow: 'hidden',
            mb: 6,
            height: '400px'
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d77.4051603!3d28.5021319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce626851f7009%3A0x621185133cfd1ad1!2sGeeksforGeeks!5e0!3m2!1sen!2sin!4v1585209157468!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Paper>

        {/* Contact Section */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
            mb: 3,
            textAlign: 'center'
          }}
        >
          Connect directly via
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: '16px',
                bgcolor: '#E8F4F8',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <PhoneIcon sx={{ fontSize: 32, color: '#007AFF' }} />
              <Link
                href="tel:9762907026"
                sx={{
                  fontFamily: 'cursive',
                  fontSize: '1.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                9762907026
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: '16px',
                bgcolor: '#E7FFE7',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <WhatsAppIcon sx={{ fontSize: 32, color: '#25D366' }} />
              <Link
                href="https://wa.me/7559144928"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontFamily: 'cursive',
                  fontSize: '1.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                7559144928
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;