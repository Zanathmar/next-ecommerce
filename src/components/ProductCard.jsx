import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { formatCurrency } from "@/core/helpers";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStar } from "react-icons/md";

export default function ProductCard({ href, image, category, name, rating, price }) {
  return (
    <Link href={href} passHref>
      <Card
        sx={{
          width: 300,
          height: 420, // Fixed height for uniformity
          borderRadius: "16px",
          boxShadow: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Product Image (Reduced Height) */}
        <CardMedia sx={{ height: 180 }}>
          <Image 
            src={image} 
            alt={name} 
            width={300} 
            height={180} 
            className="w-full h-full object-cover"
          />
        </CardMedia>

        {/* Product Details */}
        <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {/* Category Badge */}
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              padding: "4px 8px",
              borderRadius: "8px",
              display: "inline-block",
              fontWeight: 500,
              width: "fit-content",
            }}
          >
            {category}
          </Typography>

          {/* Product Name (Ensuring Visibility) */}
          <Typography variant="h6" fontWeight="bold" mt={1} sx={{ minHeight: 48 }}>
            {name}
          </Typography>

          {/* Rating (if available) */}
          {rating && (
            <Box display="flex" alignItems="center" mt={1} color="yellow.500">
              <MdOutlineStar style={{ marginRight: 4 }} />
              <Typography variant="body2" fontWeight="bold">
                {rating}
              </Typography>
            </Box>
          )}

          {/* Price */}
          <Typography variant="h6" fontWeight="bold" color="primary" mt={1}>
            {formatCurrency(price)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}